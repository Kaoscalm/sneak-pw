const crypto = require('crypto');

async function createSecret(secretText, { ttl = 86400, burn = 1 } = {}) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);

  // Encrypts the text by combining the ciphertext / authTag for compatibility with Web Crypto API
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([
    cipher.update(secretText, 'utf8'),
    cipher.final(),
    cipher.getAuthTag()
  ]);

  const b2u = (buf) => buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const response = await fetch('https://yourdomain.com/api.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ciphertext: b2u(encrypted),
      iv: b2u(iv),
      ttl,
      burn
    })
  });

  const data = await response.json();
  if (!data.id) throw new Error(data.error || 'Error creating the secret');

  return `https://yourdomain.com/#${data.id}-${b2u(key)}`;
}

module.exports = { createSecret };