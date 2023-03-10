const Router = require("@koa/router")
const notificationService = require("../2_service/notification")
const Joi = require("joi")
const validate = require("./_validator")

const getAllNotifications = async (ctx) => {
  ctx.body = await notificationService.getAll(ctx.query)
}

getAllNotifications.validationScheme = {
  query: {
    take: Joi.number().integer().min(0).optional(),
    skip: Joi.number().integer().min(0).optional(),
  },
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/me/notifications",
  })

  router.get(
    "/",
    validate(getAllNotifications.validationScheme),
    getAllNotifications
  )

  app.use(router.routes()).use(router.allowedMethods())
}
