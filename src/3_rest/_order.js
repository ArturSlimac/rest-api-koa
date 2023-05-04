const Router = require("@koa/router")
const ordersService = require("../2_service/order")
const Joi = require("joi")
const validate = require("./_validator")
const { tables, statusesOrder } = require("../0_data")
const testPurchaser = 1

const getAllOrders = async (ctx) => {
  ctx.body = await ordersService.getAll(testPurchaser, ctx.query)
}

getAllOrders.validationScheme = {
  query: {
    take: Joi.number().integer().min(0).optional(),
    skip: Joi.number().integer().min(0).optional(),
    sort_by: Joi.string().valid("id", "date", "status", "purchaser").optional(),
    order_by: Joi.string().valid("asc", "desc").optional(),
    filter: Joi.object({
      id: Joi.number().integer().min(0).optional(),
      status: Joi.string()
        .allow("")
        .valid(
          statusesOrder.delivered,
          statusesOrder.ordered,
          statusesOrder.out_for_delivery,
          statusesOrder.processed,
          statusesOrder.shipped
        )
        .optional(),
      purchaser: Joi.string().allow("").optional(),
      date: Joi.date().optional(),
    }).optional(),
  },
}

const getOrderById = async (ctx) => {
  ctx.body = await ordersService.getById(testPurchaser, ctx.params)
}

getOrderById.validationScheme = {
  params: {
    id: Joi.number().integer().min(0),
  },
}

const createOrder = async (ctx) => {
  const newOrder = await ordersService.create(testPurchaser, {
    ...ctx.request.body,
    date: new Date(ctx.request.body.date),
  })
  console.log(newOrder)
  ctx.body = newOrder
  ctx.status = 201
}
createOrder.validationScheme = {
  body: {
    date: Joi.date().required(),
    //deliveryServiceId: Joi.number().integer().positive(),
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
      city: Joi.string(),
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

const updateOrderById = async (ctx) => {
  const updatedOrder = await ordersService.updateById(
    ctx.params,
    ctx.request.body
  )

  ctx.body = updatedOrder
  ctx.status = 200
}

updateOrderById.validationScheme = {
  params: {
    id: Joi.number().integer().min(0),
  },
  body: Joi.object({
    delivery_address: Joi.object({
      street: Joi.string(),
      streetNr: Joi.string(),
      zip: Joi.string(),
      country: Joi.string(),
      city: Joi.string(),
    }).optional(),
    boxes: Joi.array()
      .items(
        Joi.object({
          bxId: Joi.number().integer().positive(),
          quantity: Joi.number().integer().positive(),
          price: Joi.number().positive(),
        })
      )
      .optional(),
  }).or("delivery_address", "boxes"),
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/me/orders",
  })

  router.get(
    "/",
    (ctx, next) => {
      const parsedFilter = ctx.query.filter && JSON.parse(ctx.query.filter)
      ctx.query.filter = parsedFilter

      return validate(getAllOrders.validationScheme)(ctx, next)
    },
    getAllOrders
  )

  router.get("/:id", validate(getOrderById.validationScheme), getOrderById)
  router.post("/", validate(createOrder.validationScheme), createOrder)
  router.put(
    "/:id",
    validate(updateOrderById.validationScheme),
    updateOrderById
  )

  app.use(router.routes()).use(router.allowedMethods())
}
