const Router = require("@koa/router")
const ordersService = require("../2_service/order")
const Joi = require("joi")
const validate = require("./_validator")

const getAllorders = async (ctx) => {
  ctx.body = await ordersService.getAll(ctx.query)
}

getAllorders.validationScheme = {
  query: {
    page: Joi.number().integer().min(0).optional(),
    skip: Joi.number().integer().min(0).optional(),
  },
}

const getOrderById = async (ctx) => {
  ctx.body = await ordersService.getById(ctx.params)
}

getOrderById.validationScheme = {
  params: {
    id: Joi.number().integer().min(0),
  },
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/me/orders",
  })

  router.get("/", validate(getAllorders.validationScheme), getAllorders)
  router.get("/:id", validate(getOrderById.validationScheme), getOrderById)

  app.use(router.routes()).use(router.allowedMethods())
}
