import { randomBytes, scrypt } from 'node:crypto';

const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);
const password = Buffer.concat(chunks).toString('utf8').trimEnd();
if (password.length < 12) {
  console.error('Password must contain at least 12 characters.');
  process.exit(1);
}
const salt = randomBytes(16).toString('hex');
scrypt(password, salt, 64, (error, derived) => {
  if (error) throw error;
  process.stdout.write(`scrypt$${salt}$${derived.toString('hex')}`);
});
