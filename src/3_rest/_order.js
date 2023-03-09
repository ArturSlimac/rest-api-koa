const Router = require("@koa/router")
const ordersService = require("../2_service/order")
const Joi = require("joi")
const validate = require("./_validator")
const testUser = 8

const getAllOrders = async (ctx) => {
  ctx.body = await ordersService.getAll(testUser, ctx.query)
}

getAllOrders.validationScheme = {
  query: {
    page: Joi.number().integer().min(0).optional(),
    skip: Joi.number().integer().min(0).optional(),
  },
}

const getOrderById = async (ctx) => {
  ctx.body = await ordersService.getById(testUser, ctx.params)
}

getOrderById.validationScheme = {
  params: {
    id: Joi.number().integer().min(0),
  },
}

const createOrder = async (ctx) => {
  const newOrder = await ordersService.createOrder(testUser, {
    ...ctx.request.body,
    date: new Date(ctx.request.body.date),
  })
  ctx.body = newOrder
  ctx.status = 201
}
createOrder.validationScheme = {}

module.exports = (app) => {
  const router = new Router({
    prefix: "/me/orders",
  })

  router.get("/", validate(getAllOrders.validationScheme), getAllOrders)
  router.get("/:id", validate(getOrderById.validationScheme), getOrderById)
  // router.post("/", validate(createOrder.validationScheme), createOrder)
  router.post("/", createOrder)

  app.use(router.routes()).use(router.allowedMethods())
}
