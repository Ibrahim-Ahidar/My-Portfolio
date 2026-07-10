/**
 * Sends contact form data to the Vercel serverless function.
 * @param {{ fullName: string, telephone: string, need: string, message: string, website?: string }} payload
 * @returns {Promise<{ ok: true }>}
 */
export async function sendContactMessage(payload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.error || 'Failed to send message. Please try again.';
    throw new Error(message);
  }

  return data;
}
