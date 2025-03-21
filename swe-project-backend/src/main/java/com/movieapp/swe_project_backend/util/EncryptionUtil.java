package com.movieapp.swe_project_backend.util;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class EncryptionUtil {

    private static final String ALGORITHM = "AES/CBC/PKCS5Padding"; // ✅ Ensures correct padding
    private static final String KEY_ALGORITHM = "AES";
    
    // 🛑 Hardcoded values for now (replace with secure method later)
    private static final String SECRET_KEY = "1234567890123456";  // 16-byte key
    private static final String IV = "abcdefghijklmnop";  // 16-byte IV for CBC mode

    private static SecretKey getSecretKey() {
        return new SecretKeySpec(SECRET_KEY.getBytes(), KEY_ALGORITHM);
    }

    public static String encrypt(String data) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, getSecretKey(), new IvParameterSpec(IV.getBytes()));
        byte[] encryptedData = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encryptedData);
    }

    public static String decrypt(String encryptedData) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, getSecretKey(), new IvParameterSpec(IV.getBytes()));
        byte[] decryptedData = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
        return new String(decryptedData);
    }
}