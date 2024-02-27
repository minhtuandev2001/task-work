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

// [GET] /api/v1/tasks/detail/:id
const detail = async (req, res) => {
  try {
    const id = req.params.id
    const task = await Task.findOne({
      _id: id,
      deleted: false
    })
    if (!task) {
      res.json({
        code: 400,
        message: "Task không tồn tại"
      })
      return
    }
    res.json(task)
  } catch (error) {
    res.json({
      code: 400,
      message: "không có task này!"
    })
  }
}

// [PATCH] /api/v1/tasks/change-status/:id
const changeStatus = async (req, res) => {
  try {
    const id = req.params.id
    const status = req.body.status
    // kiểm tra tồn tại của task 
    const checktask = await Task.findOne({ _id: id, deleted: false });
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
const changeMulti = async (req, res) => {
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
      case 'delete':
        await Task.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: Date.now() });
        res.json({
          code: 200,
          message: "Xóa thành công!"
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
    req.body.createdBy = req.user.id
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

// [PATCH] /api/v1/task/edit/:id
const edit = async (req, res) => {
  try {
    const id = req.params.id;
    // checks task tồn tại không 
    const checktask = await Task.findOne({ _id: id, deleted: false });
    if (!checktask) {
      res.json({
        code: 400,
        message: "Task không tồn tại"
      })
      return
    }
    await Task.updateOne({ _id: id }, req.body)
    res.json({
      code: 200,
      message: "Cập nhật task thành công!"
    })
  } catch (error) {
    res.json({
      code: 500,
      message: "Cập nhật task thất bại!"
    })
  }
}

// [POST] /api/v1/task/delete/:id
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    // checks tồn tại của task
    const checktask = await Task.findOne({ _id: id, deleted: false })
    if (!checktask) {
      res.json({
        code: 400,
        message: "Không tồn tại task này!"
      })
      return
    }
    await Task.updateOne({ _id: id }, { deleted: true, deletedAt: Date.now() })
    res.json({
      code: 200,
      message: "Đã xóa task"
    })
  } catch (error) {
    res.json({
      code: 500,
      message: "Cập nhật task thất bại!"
    })
  }
}
module.exports = {
  index,
  detail,
  changeStatus,
  changeMulti,
  create,
  edit,
  deleteTask
}