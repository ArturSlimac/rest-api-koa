const Router = require("@koa/router")
const productsService = require("../2_service/product")
const Joi = require("joi")
const validate = require("./_validator")

const getAllProducts = async (ctx) => {
  ctx.body = await productsService.getAll(ctx.query)
}

getAllProducts.validationScheme = {
  query: {
    page: Joi.number().integer().min(0).optional(),
    take: Joi.number().integer().min(0).optional(),
  },
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/products",
  })

  router.get("/", validate(getAllProducts.validationScheme), getAllProducts)

  app.use(router.routes()).use(router.allowedMethods())
}
