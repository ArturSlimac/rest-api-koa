const Router = require("@koa/router")
const categoriesService = require("../2_service/categogy")
const Joi = require("joi")
const validate = require("./_validator")

const getAllCategories = async (ctx) => {
  ctx.body = await categoriesService.getAll(ctx.query)
}

getAllCategories.validationScheme = {
  query: {
    take: Joi.number().integer().min(0).optional(),
    skip: Joi.number().integer().min(0).optional(),
  },
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/categories",
  })

  router.get("/", validate(getAllCategories.validationScheme), getAllCategories)

  app.use(router.routes()).use(router.allowedMethods())
}
