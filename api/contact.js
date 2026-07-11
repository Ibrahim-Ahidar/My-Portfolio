const MAX_NAME = 100;
const MAX_EMAIL = 120;
const MAX_MESSAGE = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Mask for diagnostics — e.g. ahidaribrahim77@gmail.com → a***@gmail.com */
function maskEmail(value) {
  const raw = String(value || '').trim();
  const match = raw.match(/^(?:.*<)?([^<>\s]+@[^<>\s]+)(?:>)?$/);
  const email = (match ? match[1] : raw).toLowerCase();
  const at = email.indexOf('@');
  if (at < 1) return '(unset)';
  const user = email.slice(0, at);
  const domain = email.slice(at + 1);
  const visible = user.slice(0, 1);
  return `${visible}***@${domain}`;
}

function getConfig() {
  // Read at request time (not module load) so Vercel runtime env is always used
  const apiKey = String(
    process.env.RESEND_API_KEY ||
      process.env.resend_api_key ||
      ''
  ).trim();

  const toEmail = String(
    process.env.CONTACT_TO_EMAIL || 'ahidaribrahim77@gmail.com'
  ).trim();

  const fromEmail = String(
    process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>'
  ).trim();

  return { apiKey, toEmail, fromEmail };
}

async function readBody(req) {
  // Vercel often pre-parses JSON into req.body — prefer that
  if (req.body != null && req.body !== '') {
    if (typeof req.body === 'object') return req.body;
    if (typeof req.body === 'string') {
      try {
        return req.body ? JSON.parse(req.body) : {};
      } catch {
        throw new Error('Invalid JSON body');
      }
    }
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function validate(payload) {
  const fullName = String(payload.fullName || '').trim();
  const email = String(payload.email || '').trim().toLowerCase();
  const message = String(payload.message || '').trim();

  if (!fullName || fullName.length > MAX_NAME) {
    return { ok: false, error: 'Please provide a valid name.' };
  }
  if (!email || email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return { ok: false, error: 'Please provide a valid email address.' };
  }
  if (!message || message.length > MAX_MESSAGE) {
    return { ok: false, error: 'Please provide a message.' };
  }

  return { ok: true, data: { fullName, email, message } };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return json(res, 204, {});
  }

  // Safe status check — does not expose secrets
  if (req.method === 'GET') {
    const { apiKey, toEmail, fromEmail } = getConfig();
    return json(res, 200, {
      configured: Boolean(apiKey),
      hasToEmail: Boolean(toEmail),
      toMasked: maskEmail(toEmail),
      fromMasked: maskEmail(fromEmail),
      runtime: 'node',
    });
  }

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  const { apiKey, toEmail, fromEmail } = getConfig();

  if (!apiKey) {
    console.error(
      'RESEND_API_KEY missing. Available env keys:',
      Object.keys(process.env)
        .filter((k) => /resend|contact|email/i.test(k))
        .join(', ') || '(none matching)'
    );
    return json(res, 500, {
      error:
        'Email service is not configured. Set RESEND_API_KEY in Vercel and redeploy.',
    });
  }

  let payload;
  try {
    payload = await readBody(req);
  } catch {
    return json(res, 400, { error: 'Invalid request body.' });
  }

  console.log(
    'Contact payload keys',
    JSON.stringify({
      keys: Object.keys(payload || {}),
      hasFullName: Boolean(payload?.fullName),
      hasEmail: Boolean(payload?.email),
      hasMessage: Boolean(payload?.message),
      messageLen: String(payload?.message || '').length,
    })
  );

  const result = validate(payload);
  if (!result.ok) {
    return json(res, 400, { error: result.error });
  }

  const { fullName, email, message } = result.data;
  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  try {
    console.log(
      'Contact send attempt',
      JSON.stringify({
        to: maskEmail(toEmail),
        from: maskEmail(fromEmail),
        replyTo: maskEmail(email),
      })
    );

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio contact — ${fullName}`,
        html: `
          <h2>New portfolio contact</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
        text: [
          'New portfolio contact',
          `Name: ${fullName}`,
          `Email: ${email}`,
          '',
          'Message:',
          message,
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Resend error:', response.status, details);

      let hint = 'Failed to send message. Please try again later.';
      if (response.status === 403 && /resend\.dev|own email/i.test(details)) {
        hint =
          'Resend blocked the send: with onboarding@resend.dev you can only deliver to the email on your Resend account. Verify a domain or set CONTACT_TO_EMAIL to that account email.';
      } else if (response.status === 401 || response.status === 403) {
        hint =
          'Email provider rejected the request. Check RESEND_API_KEY and CONTACT_FROM_EMAIL in Vercel.';
      }

      return json(res, 502, { error: hint });
    }

    const sent = await response.json().catch(() => null);
    const emailId = sent?.id || null;

    // Confirm delivery target + event from Resend (not just "accepted")
    let lastEvent = null;
    let resendTo = null;
    if (emailId) {
      try {
        const statusRes = await fetch(
          `https://api.resend.com/emails/${emailId}`,
          { headers: { Authorization: `Bearer ${apiKey}` } }
        );
        if (statusRes.ok) {
          const statusBody = await statusRes.json();
          lastEvent = statusBody.last_event || null;
          resendTo = Array.isArray(statusBody.to)
            ? statusBody.to.map(maskEmail).join(', ')
            : maskEmail(statusBody.to);
          console.log(
            'Resend status',
            JSON.stringify({ id: emailId, lastEvent, to: resendTo })
          );
        }
      } catch (statusError) {
        console.error('Resend status lookup failed:', statusError);
      }
    }

    return json(res, 200, {
      ok: true,
      id: emailId || undefined,
      toMasked: resendTo || maskEmail(toEmail),
      lastEvent: lastEvent || undefined,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return json(res, 500, { error: 'Something went wrong. Please try again later.' });
  }
}
