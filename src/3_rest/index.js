const Router = require("@koa/router")
const installProductRouter = require("./_product")
const installCartRouter = require("./_cart")
const installOrderRouter = require("./_order")

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  })

  installProductRouter(router)
  installCartRouter(router)
  installOrderRouter(router)

  app.use(router.routes()).use(router.allowedMethods())
}
