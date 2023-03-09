const Router = require("@koa/router")
const boxesService = require("../2_service/box")
const Joi = require("joi")
const validate = require("./_validator")

const getAllAvaliableBoxes = async (ctx) => {
  ctx.body = await boxesService.getAllAvailable()
}

getAllAvaliableBoxes.validationScheme = null

const getByAvailableType = async (ctx) => {
  ctx.body = await boxesService.getByAvailableType(ctx.params)
}

getByAvailableType.validationScheme = {
  params: {
    type: Joi.string(),
  },
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/boxes",
  })

  router.get(
    "/",
    validate(getAllAvaliableBoxes.validationScheme),
    getAllAvaliableBoxes
  )
  router.get(
    "/:type",
    validate(getByAvailableType.validationScheme),
    getByAvailableType
  )

  app.use(router.routes()).use(router.allowedMethods())
}
