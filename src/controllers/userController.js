import User from "../models/user.js";
import bcrypt from "bcrypt";

const passwordChange = async (req, res) => {
  try {
    const { currentPassword, newPassword, userID } = req.body;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(409).json({ msg: "Kullanıcı bulunamadı" });
    } else {
      if (currentPassword === newPassword) {
        return res
          .status(409)
          .json({ msg: "Mevcut şifre ile yeni şifre aynı olamaz." });
      } else {
        const isValidPassword = await bcrypt.compare(
          currentPassword,
          user.password
        );
        if (!isValidPassword) {
          return res
            .status(409)
            .json({ msg: "Mevcut şifrenizi yanlış girdiniz." });
        } else {
          user.password = newPassword.toString();
          await user.save();
          res.status(200).json({
            msg: "success",
            data: user,
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: "Hata", error });
  }
};

export { passwordChange };
