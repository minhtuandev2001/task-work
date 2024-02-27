const md5 = require("md5")
const User = require("../../model/user.model")
const ForgotPassword = require("../../model/forgot-password.model")

const sendMailHelper = require("../../utils/sendMail")
const generate = require("../../utils/generate")

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

// [POST] /api/v1/user/password/forgot
const forgotPassword = async (req, res) => {
  // gửi mã otp về cho client
  const email = req.body.email
  // check email có được đăng ký chưa
  const user = await User.findOne({ email: email })
  if (!user) {
    res.json({
      code: 400,
      message: "Email này không tồn tại!"
    })
    return
  }
  // end check người dùng tồn tại 
  const objectForgotPassword = {
    email: email,
    otp: "",
    expireAt: Date.now()
  }
  objectForgotPassword.otp = generate.generateRandomNumber(8)
  // việc 1: lưu data otp vào database
  const forgotPassword = new ForgotPassword(objectForgotPassword)
  await forgotPassword.save()

  let subject = "Mã OTP xác minh lấy lại mật khẩu"
  let html = `Mã OTP xác minh lấy lại mật khẩu <b>${objectForgotPassword.otp}</b>. không được để lộ, thời gian hiệu lực là 3 phút`
  // việc 2: gửi mã otp cho client
  sendMailHelper.sendMail(email, subject, html)
  res.json({
    code: 200,
    message: "Đã gửi mã otp qua email"
  })
}

// [POST] /api/v1/user/password/otp
const otpPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    const forgotPassword = await ForgotPassword.findOne({
      email: email,
      otp: otp
    })
    if (!forgotPassword) {
      res.json({
        code: 400,
        message: "Mã xác thực không đúng!"
      })
      return
    }
    const user = await User.findOne({ email: email, deleted: false }).select("token")
    res.cookie("token", user.token)
    res.json({
      code: 200,
      message: "Xác nhận thành công OTP"
    })
  } catch (error) {
    res.json({
      code: 500,
      message: "Lỗi xử lý xác nhận OTP"
    })
  }
}

// [POST] /api/v1/user/passwprd/reset
const resetPassword = async (req, res) => {
  try {
    const password = md5(req.body.password);
    const token = req.cookies.token;
    const user = await User.findOne({ token: token })
    if (user.password === password) {
      res.json({
        code: 400,
        message: "Nhập mật khẩu mới khác với mật khẩu cũ!"
      })
      return
    }
    await User.updateOne({ token: token }, { password: password })

    res.json({
      code: 200,
      message: "Cập nhật mật khẩu thành công!"
    })
  } catch (error) {
    res.json({
      code: 500,
      message: "Lỗi khi cập nhật lại mật khẩu"
    })
  }
}

// [GET] /api/v1/user/detail/:id
const detail = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id, deleted: false }).select("-password -token");
    if (!user) {
      res.json({
        code: 400,
        message: "Người dùng không tồn tại!"
      })
      retrun
    }
    res.json({
      code: 200,
      message: "Truy cập thông tin người dùng thành công",
      data: user
    })
  } catch (error) {
    res.json({
      code: 500,
      message: "Lỗi khi truy cập thông tin người dùng"
    })
  }
}
module.exports = {
  register,
  login,
  forgotPassword,
  otpPassword,
  resetPassword,
  detail
}