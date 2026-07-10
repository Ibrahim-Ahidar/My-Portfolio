/**
 * Sends contact form data to the Vercel serverless function.
 * @param {{ fullName: string, email: string, message: string, website?: string }} payload
 * @returns {Promise<{ ok: true }>}
 */
export async function sendContactMessage(payload) {
  const { fullName, email, message, website = '' } = payload;

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, message, website }),
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

  return data;
}
