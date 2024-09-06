import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

const SECRET_KEY = process.env.JWT_SECRET;

// Kullanıcı oluşturma
const createUser = async (req, res) => {
  try {
    const user = req.body;

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: `${user.email} e-posta adresi kullanılıyor.` });
    } else {
      // Şifreyi hashleyelim
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await User.create({ ...user, password: hashedPassword });

      return res.status(201).json({
        msg: "Kullanıcı oluşturuldu",
        data: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Kullanıcı oluşturulamadı",
      error,
    });
  }
};

// Kullanıcı giriş
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const isValidPassword = await bcrypt.compare(password, existingUser.password);

      if (isValidPassword) {
        return res.status(201).json({
          msg: "Kullanıcı başarılı bir şekilde giriş yaptı",
          data: existingUser,
          token: createToken(existingUser._id),
        });
      } else {
        return res.status(401).json({ msg: "E-posta adresi veya şifre yanlış" });
      }
    } else {
      return res.status(401).json({ msg: "E-posta adresi veya şifre yanlış" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Hata", error });
  }
};

// Token oluşturma fonksiyonu
const createToken = (userID) => {
  return jwt.sign({ userID }, SECRET_KEY, {
    expiresIn: "365d",
  });
};

// Nodemailer yapılandırması
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Şifre sıfırlama talebi
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Kullanıcı bulunamadı." });
    }

    // Şifre sıfırlama token'ı oluştur
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '15m' });

    // Şifre sıfırlama bağlantısı
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Dinamik e-posta adresi
      subject: 'Şifre Sıfırlama İsteği',
      text: `Şifrenizi sıfırlamak için bu bağlantıya tıklayın: ${resetLink}`,
    };

    console.log('Gönderilen e-posta içeriği:', mailOptions.text);

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Şifre sıfırlama bağlantısı gönderildi.' });
  } catch (error) {
    res.status(500).json({ msg: "Bir hata oluştu.", error });
  }
};

// Şifre sıfırlama işlemi
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Token doğrulaması
    const decoded = jwt.verify(token, SECRET_KEY);

    // Yeni şifreyi hashle ve kaydet
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ email: decoded.email }, { password: hashedPassword });

    res.json({ message: 'Şifre başarıyla güncellendi.' });
  } catch (error) {
    res.status(400).json({ message: 'Geçersiz veya süresi dolmuş token.' });
  }
};

export { createUser, userLogin, forgotPassword, resetPassword };
