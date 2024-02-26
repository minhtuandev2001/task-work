const express = require("express");
require('dotenv').config()
const connectDB = require("./config/db");

const route = require("./api/v1/routers/client/index.route")

const app = express();
const port = process.env.PORT || 5000;

// connect DB
connectDB();

// Routes version 1
route(app)

// app.get("/task", async (req, res) => {
//   const tasks = await Task.find({
//     deleted: false,
//   });
//   res.json(tasks)
// })

// app.get("/task/detail/:id", async (req, res) => {
//   try {
//     const task = await Task.findOne({
//       _id: req.params.id,
//       deleted: false,
//     });
//     res.json(task)
//   } catch (error) {
//     res.redirect("/task")
//   }
// })

app.listen(port, () => {
  console.log("listening on port ", port)
})