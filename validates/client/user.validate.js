const register = (req, res, next) => {
  if (!req.body.fullName) {
    res.json({
      code: 400,
      message: "Không được bỏ trống tên!"
    })
    return
  }
  if (req.body.fullName.length < 3 || req.body.fullName.length > 40) {
    res.json({
      code: 400,
      message: "Độ dài họ tên phải lớn hơn 3 và nhỏ hơn 40 ký tự!"
    })
    return
  }
  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Không được bỏ trống email!"
    })
    return
  }
  if (!req.body.password) {
    res.json({
      code: 400,
      message: "Không được bỏ trống password!"
    })
    return
  }
  if (!req.body.confirmPassword) {
    res.json({
      code: 400,
      message: "Nhập xác thực mật khẩu của bạn!"
    })
    return
  }
  next()
}

const login = (req, res, next) => {
  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Không được bỏ trống email!"
    })
    return
  }
  if (!req.body.password) {
    res.json({
      code: 400,
      message: "Không được bỏ trống password!"
    })
    return
  }
  next()
}

const forgotPassword = (req, res, next) => {
  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Nhập email muốn lấy lại mật khẩu"
    })
    return
  }
  next()
}
const otpPassword = (req, res, next) => {
  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Nhập email muốn lấy lại mật khẩu"
    })
    return
  }
  if (!req.body.otp) {
    res.json({
      code: 400,
      message: "Không được để tróng trường OTP"
    })
    return
  }
  next()
}

const resetPassword = (req, res, next) => {
  if (!req.body.password) {
    res.json({
      code: 400,
      message: "Nhập mật khẩu mới của bạn!"
    })
    return
  }
  if (!req.body.confirmPassword) {
    res.json({
      code: 400,
      message: "Xác thực lại mật khẩu mới của bạn!"
    })
    return
  }
  if (req.body.password !== req.body.confirmPassword) {
    res.json({
      code: 400,
      message: "Mật khẩu xác thực không khớp, nhập lại"
    })
    return
  }
  if (req.body.password.length < 8) {
    res.json({
      code: 400,
      message: "Độ dài mật khẩu phải lớn hơn hoặc bằng 8 ký tự!"
    })
    return
  }
  if (!req.cookies.token) {
    res.json({
      code: 400,
      message: "Token hết hạn hoặc không có"
    })
    return
  }
  next()
}
module.exports = {
  register,
  login,
  forgotPassword,
  otpPassword,
  resetPassword
}