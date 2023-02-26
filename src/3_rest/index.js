const Router = require("@koa/router")
const installProductRouter = require("./_product")
const installCartRouter = require("./_cart")

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  })

  installProductRouter(router)
  installCartRouter(router)

  app.use(router.routes()).use(router.allowedMethods())
}
