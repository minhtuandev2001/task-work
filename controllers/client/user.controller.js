const md5 = require("md5")
const User = require("../../model/user.model")

// [POST] /api/v1/user/register
const register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    // check tồn tại email 
    const checkEmail = await User.findOne({ email: email, deleted: false });
    if (checkEmail) {
      res.json({
        code: 400,
        message: "Email này đã được sử dụng!"
      })
      return
    }
    if (password !== confirmPassword) {
      res.json({
        code: 400,
        message: "Mật khẩu xác nhận không đúng!"
      })
      return
    }
    // hash mật khẩu trước khi lưu vào db
    req.body.password = md5(req.body.password)
    const user = new User(req.body);
    await user.save()

    // trả về token
    res.cookie("token", user.token)

    res.json({
      code: 200,
      message: "Đăng ký tài khoản thành công!",
      token: user.token
    })
  } catch (error) {
    res.json({
      code: 500,
      message: "Đăng ký tài khoản thất bại!"
    })
  }
}

// [POST] /api/v1/user/login
const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = md5(req.body.password);

    const user = await User.findOne({ email: email, deleted: false })
    if (!user) {
      res.json({
        code: 400,
        message: "Tài khoản này không tồn tại!"
      })
      return
    }
    if (password !== user.password) {
      res.json({
        code: 400,
        message: "Mật khẩu không đúng!"
      })
      return
    }
    res.cookie("token", user.token)
    res.json({
      code: 200,
      message: "Đăng nhập thành công!",
      token: user.token
    })
  } catch (error) {
    res.json({
      code: 500,
      message: "Đăng nhập thất bại!"
    })
  }
}
module.exports = {
  register,
  login
}