
const changeStatus = (req, res, next) => {
  if (!req.body.status) {
    res.json({
      code: 400,
      message: "Bạn hãy chọn trạng thái cho task!"
    })
    return
  }
  next()
}

const changeMulti = (req, res, next) => {
  if (!req.body.ids) {
    res.json({
      code: 400,
      message: "Bạn hãy chọn task cần thay đổi!"
    })
    return
  }
  if (!req.body.key) {
    res.json({
      code: 400,
      message: "Bạn hãy chọn option thay đổi!"
    })
    return
  }
  next()
}

const create = (req, res, next) => {
  if (!req.body.title) {
    res.json({
      code: 400,
      message: "Nhập tiêu đề task!"
    })
    return
  }
  if (!req.body.status) {
    res.json({
      code: 400,
      message: "Nhập trạng thái task!"
    })
    return
  }
  if (!req.body.content) {
    res.json({
      code: 400,
      message: "Nhập nội dung task!"
    })
    return
  }
  if (!req.body.timeStart) {
    res.json({
      code: 400,
      message: "Chọn thời gian bắt đầu!"
    })
    return
  }
  if (!req.body.timeFinish) {
    res.json({
      code: 400,
      message: "Chọn thời gian kết thúc!"
    })
    return
  }
  next()
}

module.exports = {
  changeStatus,
  changeMulti,
  create
}