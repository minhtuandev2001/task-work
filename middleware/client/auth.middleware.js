const User = require("../../model/user.model")

const requireAuth = (req, res, next) => {
  if (!req.headers?.authorization) {
    res.json({
      code: 400,
      message: "Vui lòng đăng nhập trước!"
    })
    return
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const user = User.findOne({ token: token, deleted: false })
    if (!user) {
      res.json({
        code: 400,
        message: "Token không hợp lệ!"
      })
      return
    }
    next()
  }
}

module.exports = {
  requireAuth
}