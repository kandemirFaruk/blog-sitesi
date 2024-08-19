import User from "../models/user.js";

const createUser = async (req, res) => {
  try {
    const user = req.body;

    const existingUser = await User.findOne({ userName: user.userName });
    console.log(existingUser);
    if (existingUser) {
      return res.status(409).json({ message: `${user.userName} adlı kullanıcı adı kullanılıyor.`  });
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

export { createUser };
