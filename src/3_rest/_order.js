const Router = require("@koa/router")
const ordersService = require("../2_service/order")
const Joi = require("joi")
const validate = require("./_validator")
const testUser = 1

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
createOrder.validationScheme = {
  body: {
    date: Joi.date().required(),
    deliveryServiceId: Joi.number().integer().positive(),
    currencyId: Joi.string().required(),
    products: Joi.array().items(
      Joi.object({
        prdctId: Joi.number().integer().positive(),
        quantity: Joi.number().integer().positive(),
        netPrice: Joi.number().positive(),
      })
    ),
    delivery_address: Joi.object({
      street: Joi.string(),
      streetNr: Joi.string(),
      zip: Joi.string(),
      country: Joi.string(),
    }),
    boxes: Joi.array().items(
      Joi.object({
        bxId: Joi.number().integer().positive(),
        quantity: Joi.number().integer().positive(),
        price: Joi.number().positive(),
      })
    ),
  },
}

const updateOrderById = async (ctx) => {}

updateOrderById.validationScheme = {}

module.exports = (app) => {
  const router = new Router({
    prefix: "/me/orders",
  })

  router.get("/", validate(getAllOrders.validationScheme), getAllOrders)
  router.get("/:id", validate(getOrderById.validationScheme), getOrderById)
  router.post("/", validate(createOrder.validationScheme), createOrder)

  app.use(router.routes()).use(router.allowedMethods())
}
