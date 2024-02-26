const express = require('express')
const router = express.Router()

const taskController = require("../../../../controllers/client/task.controller")

router.get('/', taskController.index)

router.get('/detail/:id', taskController.detail)

router.patch('/change-status/:id', taskController.changeStatus)

router.patch('/change-multi', taskController.changeMultiStatus)

router.post('/create', taskController.create)

router.patch('/edit/:id', taskController.edit)

module.exports = router