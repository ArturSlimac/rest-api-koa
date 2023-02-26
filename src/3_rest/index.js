const Router = require("@koa/router")
const installProductRouter = require("./_product")

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  })

  installProductRouter(router)

  app.use(router.routes()).use(router.allowedMethods())
}
