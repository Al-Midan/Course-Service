import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const keyLength = 32;
const ivLength = 12;
const saltLength = 16;
const tagLength = 16;

function encrypt(text: string): string {
    const password = process.env.ENCRYPTION_PASSWORD;
    if (!password) {
        throw new Error('ENCRYPTION_PASSWORD not set in environment variables');
    }

    const salt = crypto.randomBytes(saltLength);
    const key = crypto.pbkdf2Sync(password, salt, 100000, keyLength, 'sha256');
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();

    return salt.toString('hex') + ':' + iv.toString('hex') + ':' + encrypted + ':' + tag.toString('hex');
}

export { encrypt };