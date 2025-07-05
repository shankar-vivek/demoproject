import crypto from 'crypto';
const { algorithm, SECRET_KEY, iv_rounds, data_format,text_format } = process.env;


export const encryption = async (text) => {
    try {
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(SECRET_KEY), iv_rounds);
        let encryptedText = cipher.update(text, text_format, data_format);
        encryptedText += cipher.final(data_format);
        return encryptedText;
    } catch (error) {
        return error;
    }
};


export const decryption = async (encryptedText) => {
    try {
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(SECRET_KEY), Buffer.from(iv_rounds));
        let decrypted = decipher.update(encryptedText, data_format, text_format);
        decrypted += decipher.final(text_format);
        return decrypted;
    } catch (error) {
        return error;
    }
};