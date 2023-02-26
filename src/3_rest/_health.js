const Router = require("@koa/router")
const healthService = require("../2_service/health")

const ping = async (ctx) => {
  ctx.body = healthService.ping()
}

const getVersion = async (ctx) => {
  ctx.body = healthService.getVersion()
}

module.exports = function installProductsRoutes(app) {
  const router = new Router({
    prefix: "/health",
  })

  router.get("/ping", ping)
  router.get("/version", getVersion)

  app.use(router.routes()).use(router.allowedMethods())
}
