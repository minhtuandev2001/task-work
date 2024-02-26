const express = require("express");
require('dotenv').config()
const cookieParser = require('cookie-parser')

const connectDB = require("./config/db");

const route = require("./api/v1/routers/client/index.route")

const app = express();
const port = process.env.PORT || 5000;

// connect DB
connectDB();

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

// Routes version 1
route(app)

app.listen(port, () => {
  console.log("listening on port ", port)
})