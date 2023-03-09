const Router = require("@koa/router")
const purchaserService = require("../2_service/purchaser")
const Joi = require("joi")
const validate = require("./_validator")
const testPurchaser = 1

const getProfile = async (ctx) => {
  ctx.body = await purchaserService.getProfile(testPurchaser)
}

getProfile.validationScheme = null

module.exports = (app) => {
  const router = new Router({
    prefix: "/me",
  })

  router.get("/profile", validate(getProfile.validationScheme), getProfile)

  app.use(router.routes()).use(router.allowedMethods())
}
