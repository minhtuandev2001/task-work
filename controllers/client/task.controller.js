const Task = require("../../model/task.model")

// helper 
const paginationHelper = require("../../utils/pagination")

// [GET] /api/v1/tasks
const index = async (req, res) => {
  try {
    const find = {
      deleted: false
    }
    // FILTER
    if (req.query.status) {
      find.status = req.query.status
    }
    // END FILTER

    // SORT
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    }
    // END SORT

    // PAGINATION
    const countDocumentsTask = await Task.find({ deleted: false }).countDocuments()
    let objectPagination = paginationHelper.pagination({
      limit: 2,
      currentPage: 1
    }, req.query, countDocumentsTask)
    // END PAGINATION

    // SEARCH
    if (req.query.keyword) {
      find.content = new RegExp(req.query.keyword, "i")
    }
    // END SEARCH

    let data = {};
    const tasks = await Task.find(find)
      .sort(sort)
      .limit(objectPagination.limit)
      .skip(objectPagination.skip)

    data.tasks = tasks;
    data.objectPagination = objectPagination;

    res.json(data)
  } catch (error) {
    console.log(error)
    res.redirect("/api/v1/")
  }
}

// [GET] /api/v1/tasks/:id
const detail = async (req, res) => {
  try {
    const id = req.params.id
    const task = await Task.findOne({
      _id: id,
      deleted: false
    })
    res.json(task)
  } catch (error) {
    console.log(error)
    res.redirect("/api/v1/tasks")
  }
}

// [PATCH] /api/v1/tasks/change-status/:id
const changeStatus = async (req, res) => {
  try {
    const id = req.params.id
    const status = req.body.status
    // kiểm tra tồn tại của task 
    const checktask = await Task.findOne({ _id: id });
    if (!checktask) {
      res.json({
        code: 404,
        message: "Không tìm thấy task này!"
      })
      return
    }
    await Task.updateOne({ _id: id }, { status: status })
    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!"
    })
  } catch (error) {
    res.json({
      code: 500,
      message: "Cập nhật trạng thái thất bại!"
    })
  }
}

// [PATCH] /api/v1/tasks/change-multi
const changeMultiStatus = async (req, res) => {
  try {
    const { ids, key, value } = req.body
    switch (key) {
      case 'status':
        await Task.updateMany({ _id: { $in: ids } }, { status: value });
        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!"
        })
        break;
      default:
        res.json({
          code: 400,
          message: "không tồn tại!"
        })
        break;
    }
  } catch (error) {
    res.json({
      code: 500,
      message: "Cập nhật thất bại!"
    })
  }
}

// [POST] /api/v1/task/create
const create = async (req, res) => {
  try {
    console.log(req.body)
    const task = new Task(req.body)
    await task.save()
    res.json({
      code: 200,
      message: "Tạo thành công!",
      data: task
    })
  } catch (error) {
    res.json({
      code: 500,
      message: "Tạo task không thành công!"
    })
  }
}
module.exports = {
  index,
  detail,
  changeStatus,
  changeMultiStatus,
  create
}