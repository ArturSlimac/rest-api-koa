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
    skip: Joi.number().integer().min(0).optional(),
  },
}

const getProductById = async (ctx) => {
  ctx.body = await productsService.getById(ctx.params)
}

getProductById.validationScheme = {
  params: {
    id: Joi.number().integer().min(0),
  },
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/products",
  })

  router.get("/", validate(getAllProducts.validationScheme), getAllProducts)
  router.get("/:id", validate(getProductById.validationScheme), getProductById)

  app.use(router.routes()).use(router.allowedMethods())
}