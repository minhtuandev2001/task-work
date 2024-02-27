const express = require('express')
const router = express.Router()

const taskController = require("../../../../controllers/client/task.controller")
const taskValidate = require("../../../../validates/client/task.validate")

router.get('/', taskController.index)

router.get('/detail/:id', taskController.detail)

router.patch(
  '/change-status/:id',
  taskValidate.changeStatus,
  taskController.changeStatus)

router.patch(
  '/change-multi',
  taskValidate.changeMulti,
  taskController.changeMulti)

router.post(
  '/create',
  taskValidate.create,
  taskController.create)

router.patch('/edit/:id', taskController.edit)

router.delete('/delete/:id', taskController.deleteTask)


module.exports = router