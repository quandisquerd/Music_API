const CryptoJS = require("crypto-js");

// Khóa bí mật (key)
const key = "boquan8888888888"; // Thay bằng key của bạn
const keyParsed = CryptoJS.enc.Utf8.parse(key);

// Hàm mã hóa
const encryptData = (data) => {
    const iv = CryptoJS.lib.WordArray.random(16); // Tạo IV ngẫu nhiên
    const encrypted = CryptoJS.AES.encrypt(data, keyParsed, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });

    return {
        encryptedData: encrypted.toString(), // Chuỗi mã hóa (Base64)
        iv: iv.toString(CryptoJS.enc.Hex), // IV dưới dạng Hex
    };
};

// Hàm giải mã
const decryptData = (encryptedData, iv) => {
    const ivParsed = CryptoJS.enc.Hex.parse(iv); // Giải mã IV từ Hex
    const bytes = CryptoJS.AES.decrypt(encryptedData, keyParsed, {
        iv: ivParsed,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });

    return bytes.toString(CryptoJS.enc.Utf8); // Chuỗi giải mã UTF-8
};

module.exports={decryptData , encryptData}
