const Router = require("@koa/router")
const cartService = require("../2_service/cart")
const Joi = require("joi")
const validate = require("./_validator")
const testPurchaser = 1

const getCart = async (ctx) => {
  ctx.body = await cartService.getForUser(testPurchaser)
}

getCart.validationScheme = null

const mergeLocalAndDdCarts = async (ctx) => {
  ctx.body = await cartService.mergeLocalAndDdCarts(
    testPurchaser,
    ctx.request.body
  )
}

mergeLocalAndDdCarts.validationScheme = {
  body: Joi.array().items(
    Joi.object({
      prdctId: Joi.number().integer().positive(),
      quantity: Joi.number().integer().positive(),
    })
  ),
}

const postItemsInCart = async (ctx) => {
  ctx.body = await cartService.postItemsInCart(testPurchaser, ctx.request.body)
}

postItemsInCart.validationScheme = {
  body: Joi.array().items(
    Joi.object({
      prdctId: Joi.number().integer().positive(),
      quantity: Joi.number().integer().positive(),
    })
  ),
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/me",
  })

  router.get("/cart", validate(getCart.validationScheme), getCart)
  router.put(
    "/cart",
    validate(mergeLocalAndDdCarts.validationScheme),
    mergeLocalAndDdCarts
  )
  router.post(
    "/cart",
    validate(postItemsInCart.validationScheme),
    postItemsInCart
  )

  app.use(router.routes()).use(router.allowedMethods())
}
