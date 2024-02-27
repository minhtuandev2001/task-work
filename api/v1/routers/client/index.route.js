const taskRoutes = require("./task.route")
const userRoutes = require("./user.route")
const authMiddleware = require("../../../../middleware/client/auth.middleware")

module.exports = (app) => {
  const version = "/api/v1"
  app.use(`${version}/tasks`, authMiddleware.requireAuth, taskRoutes)

  app.use(`${version}/user`, userRoutes)
}