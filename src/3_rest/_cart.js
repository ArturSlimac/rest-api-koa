const Router = require("@koa/router")
const cartService = require("../2_service/cart")
const Joi = require("joi")
const validate = require("./_validator")
const testUser = 5

const getCart = async (ctx) => {
  ctx.body = await cartService.getSavedCartForUser(testUser)
}

const updateCart = async (ctx) => {
  ctx.body = await cartService.updateCart(testUser, ctx.request.body)
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/me",
  })

  router.get("/cart", getCart)
  router.put("/cart", updateCart)

  app.use(router.routes()).use(router.allowedMethods())
}
