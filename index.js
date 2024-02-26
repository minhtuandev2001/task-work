const express = require("express");
require('dotenv').config()
const connectDB = require("./config/db");
const Task = require("./model/task.model")
const app = express();
const port = process.env.PORT || 5000;

// connect DB
connectDB();

app.get("/task", async (req, res) => {
  const tasks = await Task.find({
    deleted: false,
  });
  res.json(tasks)
})

app.get("/task/detail/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      deleted: false,
    });
    res.json(task)
  } catch (error) {
    res.redirect("/task")
  }
})

app.listen(port, () => {
  console.log("listening on port ", port)
})