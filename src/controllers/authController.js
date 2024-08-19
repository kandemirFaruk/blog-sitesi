import bcrypt from "bcrypt";
import User from "../models/user.js";

const createUser = async (req, res) => {
  try {
    const user = req.body;

    const existingUser = await User.findOne({ userName: user.userName });
    console.log(existingUser);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: `${user.userName} adlı kullanıcı adı kullanılıyor.` });
    } else {
      const newUser = await User.create(user);
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

const userLogin = async (req, res) => {
  try {
    const {userName,password} = req.body;
    const existingUser = await User.findOne({userName:userName});

    console.log(existingUser)
    if (existingUser) {
      const isValidPassword = await bcrypt.compare(password, existingUser.password);
      console.log("Şifre Kontrolü",isValidPassword)

      if (isValidPassword) {
        return res
          .status(201)
          .json({
            msg: "Kullanıcı başarılı bir şekilde giriş yaptı",
            data: existingUser,
          });
      } else {
        return res
          .status(401)
          .json({ msg: "Kullanıcı adı veya şifre yanlış 1" });
      }
    } else {
      return res
        .status(401)
        .json({ msg: "Kullanıcı adı veya şifre yanlış 2"});
    }
  } catch (error) {
    res.status(500).json({msg:"Hata",error})
  }
};

export { createUser ,userLogin};
