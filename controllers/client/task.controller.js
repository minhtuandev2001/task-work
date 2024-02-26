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

module.exports = {
  index,
  detail
}