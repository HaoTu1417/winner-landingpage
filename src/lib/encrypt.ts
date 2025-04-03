import { AES_IV, AES_KEY } from "@/configs";
import CryptoJS from "crypto-js";

// Equivalent to C# hardcoded keys (Should be stored securely)
// const AES_KEY = process.env.PRIVATE_AES_KEY || ''; // 16-byte key (128-bit)
// const AES_IV = process.env.PRIVATE_AES_IV || ''; // 16-byte IV (Initialization Vector)

/**
 * Encrypts a string using AES-128-CBC (Equivalent to C# `EncryptByAES` method)
 * @param {string} plaintext - The data to encrypt
 * @returns {string} - Base64 encoded encrypted data
 */
export const encryptByAES = (plaintext: string) => {
  if (!plaintext) return plaintext;

  const encrypted = CryptoJS.AES.encrypt(
    plaintext,
    CryptoJS.enc.Utf8.parse(AES_KEY),
    {
      iv: CryptoJS.enc.Utf8.parse(AES_IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  );

  return encrypted.toString(); // Return Base64 encrypted string
};

/**
 * Decrypts an AES-128-CBC encrypted string (Equivalent to C# `DecryptByAES` method)
 * @param {string} encryptedText - Base64 encoded encrypted string
 * @returns {string} - Decrypted plaintext
 */
export const decryptByAES = (encryptedText: string) => {
  if (!encryptedText) return encryptedText;

  try {
    const decrypted = CryptoJS.AES.decrypt(
      encryptedText,
      CryptoJS.enc.Utf8.parse(AES_KEY),
      {
        iv: CryptoJS.enc.Utf8.parse(AES_IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null; // Return null if decryption fails
  }
};
