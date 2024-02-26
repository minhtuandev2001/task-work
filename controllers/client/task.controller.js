const Task = require("../../model/task.model")

// [GET] /api/v1/tasks
const index = async (req, res) => {
  try {
    const find = {
      deleted: false
    }
    if (req.query.status) {
      find.status = req.query.status
    }
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;

      console.log(sort)
    }
    const tasks = await Task.find(find).sort(sort)
    res.json(tasks)
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