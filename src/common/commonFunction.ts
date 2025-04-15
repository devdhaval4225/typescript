import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

const secretKey: string  = `|testString|`

export const uniqueNumber = async (type:string) => {
    const charset:string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let preFix:string = ``
    for (let i = 0; i < 10; i++) {
        preFix += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    var newString:string = ""
    
    switch (type) {
        case "user":
            newString = `us${preFix}`

            break;

        default:
            break;
    }
    return newString;
}

export const encrypt = async (text:string): Promise<string> => {

    try {
        const ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
        return ciphertext;
    } catch (error) {
        console.error("Encryption error:", error);
        throw new Error("Encryption failed."); // Re-throw for proper error handling
    }
};

export const decrypt = async (text:string): Promise<string> => {
    const bytes  = await CryptoJS.AES.decrypt(text, secretKey);
    const originalText = await bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};