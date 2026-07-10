const ALLOWED_NEEDS = new Set(['Website', 'Mobile App', 'Both']);
const MAX_NAME = 100;
const MAX_PHONE = 40;
const MAX_MESSAGE = 2000;

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

function readBody(req) {
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
  const telephone = String(payload.telephone || '').trim();
  const need = String(payload.need || '').trim();
  const message = String(payload.message || '').trim();
  const website = String(payload.website || '').trim(); // honeypot

  if (website) {
    return { ok: true, spam: true };
  }

  if (!fullName || fullName.length > MAX_NAME) {
    return { ok: false, error: 'Please provide a valid name.' };
  }
  if (!telephone || telephone.length > MAX_PHONE) {
    return { ok: false, error: 'Please provide a valid phone number.' };
  }
  if (!ALLOWED_NEEDS.has(need)) {
    return { ok: false, error: 'Please select a valid project type.' };
  }
  if (message.length > MAX_MESSAGE) {
    return { ok: false, error: 'Message is too long.' };
  }

  return { ok: true, spam: false, data: { fullName, telephone, need, message } };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return json(res, 204, {});
  }

  // Safe status check — does not expose secrets
  if (req.method === 'GET') {
    const { apiKey, toEmail } = getConfig();
    return json(res, 200, {
      configured: Boolean(apiKey),
      hasToEmail: Boolean(toEmail),
      // Helps confirm which deployment/runtime you hit
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

  const result = validate(payload);
  if (!result.ok) {
    return json(res, 400, { error: result.error });
  }

  if (result.spam) {
    return json(res, 200, { ok: true });
  }

  const { fullName, telephone, need, message } = result.data;
  const safeName = escapeHtml(fullName);
  const safePhone = escapeHtml(telephone);
  const safeNeed = escapeHtml(need);
  const safeMessage = escapeHtml(message || '(No message provided)').replace(/\n/g, '<br>');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `Portfolio contact: ${need} — ${fullName}`,
        html: `
          <h2>New portfolio contact</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Need:</strong> ${safeNeed}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
        text: [
          'New portfolio contact',
          `Name: ${fullName}`,
          `Phone: ${telephone}`,
          `Need: ${need}`,
          '',
          'Message:',
          message || '(No message provided)',
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Resend error:', response.status, details);
      return json(res, 502, { error: 'Failed to send message. Please try again later.' });
    }

    return json(res, 200, { ok: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return json(res, 500, { error: 'Something went wrong. Please try again later.' });
  }
}
