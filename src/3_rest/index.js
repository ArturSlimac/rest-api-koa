const Router = require("@koa/router")
const installProductRouter = require("./_product")
const installCartRouter = require("./_cart")
const installOrderRouter = require("./_order")
const installBoxRouter = require("./_box")
const installPurchaserRouter = require("./_purchaser")
const installNotificationRouter = require("./_notification")

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  })

  installProductRouter(router)
  installCartRouter(router)
  installOrderRouter(router)
  installBoxRouter(router)
  installPurchaserRouter(router)
  installNotificationRouter(router)

  app.use(router.routes()).use(router.allowedMethods())
}
