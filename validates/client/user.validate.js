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
module.exports = {
  register,
  login
}