const Router = require("@koa/router")
const tAndTService = require("../2_service/trackAndTrace")
const Joi = require("joi")
const validate = require("./_validator")

const getStatusByTTCodeVerCode = async (ctx) => {
  ctx.body = await tAndTService.getStatusByTTCodeVerCode(ctx.request.body)
}

getStatusByTTCodeVerCode.validationScheme = {
  body: {
    tt: Joi.string().required(),
    v: Joi.string().required(),
  },
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/track-and-trace",
  })

  router.post(
    "/",
    validate(getStatusByTTCodeVerCode.validationScheme),
    getStatusByTTCodeVerCode
  )

  app.use(router.routes()).use(router.allowedMethods())
}
