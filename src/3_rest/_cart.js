const Router = require("@koa/router")
const cartService = require("../2_service/cart")
const Joi = require("joi")
const validate = require("./_validator")
const testPurchaser = 1

const getCart = async (ctx) => {
  ctx.body = await cartService.getForUser(testPurchaser)
}

getCart.validationScheme = null

const updateCart = async (ctx) => {
  ctx.body = await cartService.update(testPurchaser, ctx.request.body)
}

updateCart.validationScheme = {
  body: {
    items: Joi.array().items(
      Joi.object({
        id: Joi.number().integer().positive(),
        quantity: Joi.number().integer().positive(),
      })
    ),
  },
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/me",
  })

  router.get("/cart", validate(getCart.validationScheme), getCart)
  router.put("/cart", validate(updateCart.validationScheme), updateCart)

  app.use(router.routes()).use(router.allowedMethods())
}
