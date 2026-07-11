/**
 * Sends contact form data to the Vercel serverless function.
 * @param {{ fullName: string, email: string, message: string }} payload
 * @returns {Promise<{ ok: true, id: string }>}
 */
export async function sendContactMessage(payload) {
  const { fullName, email, message } = payload;

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, message }),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const messageText = data?.error || 'Failed to send message. Please try again.';
    throw new Error(messageText);
  }

  // Real Resend sends always include an id. Missing id = request never reached the provider.
  if (!data?.id) {
    throw new Error(
      'Message was not delivered by the email provider. Please try again.'
    );
  }

  return data;
}
