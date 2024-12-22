const { decryptData, encryptData } = require("../middleware/crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SignUp = async (req, res) => {
  try {
    const { data } = req.body;
    const { iv } = req.body;
    if (!data || !iv) {
      return res.status(500).json({ message: " Field cannot be empty!" });
    }
    const decryptdata = await decryptData(data, iv);
    const dataPass = JSON.parse(decryptdata);
    const checkUesr = await User.findOne({ where: { email: dataPass.email } });
    if (checkUesr) {
      return res.status(500).json({ message: "Email already exists!" });
    }
    const hashPass = await bcrypt.hash(dataPass?.password, 10);
    const user = await User.create({
      username: dataPass.username,
      password: hashPass,
      email: dataPass.email,
    });
    if (user) {
      const accessToken = jwt.sign({ id: user.id }, "boquan");
      const encryptdata = JSON.stringify(user);
      const { encryptedData, iv } = await encryptData(encryptdata);
      return res.status(200).json({
        message: "SignUp successfully",
        token: accessToken,
        data: encryptedData,
        iv: iv,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error SignUp!", error });
  }
};
const SignIn = async (req, res) => {
  try {
    const { data } = req.body;
    const { iv } = req.body;
    if (!data) {
      return res.status(500).json({ message: " Field cannot be empty!" });
    }

    const decryptdata = await decryptData(data, iv);
 
    const dataPass = JSON.parse(decryptdata);

    const user = await User.findOne({ where: { email: dataPass.email } });

    const isPasswordValid = await bcrypt.compare(
      dataPass.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    
    if (!user) {
      return res.status(400).json({ message: "User not available!" });
    } else {
      const accessToken = jwt.sign({ id: user.id }, "boquan");
      const encryptdata = JSON.stringify(user);
      console.log(encryptData);
      const { encryptedData, iv } = await encryptData(encryptdata);

      return res.status(200).json({
        message: "SignIn successfully",
        token: accessToken,
        data: encryptedData,
        iv: iv,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error SignIn!", error });
  }
};
const testDecre = async (req, res) => {
  const data = {
    email: "111111@gmail.com",
    password: "quan",
  };
  const ivs = "";
  const encryptData = JSON.stringify(data);
  const { encryptedData, iv } = await encrypt(encryptData);
  try {
    // const decryptdata = await decrypt(data, ivs);
    // const dataPass = JSON.parse(decryptdata);
    return res.json({ data: encryptedData, iv });
  } catch (error) {
    return res.status(500).json({ message: "Decryption failed!", error });
  }
};
module.exports = { SignUp, testDecre, SignIn };
