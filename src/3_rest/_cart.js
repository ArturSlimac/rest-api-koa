const Router = require("@koa/router")
const cartService = require("../2_service/cart")
const Joi = require("joi")
const validate = require("./_validator")

const getCart = async (ctx) => {
  const testUser = 1
  ctx.body = await cartService.getSavedCartForUser(testUser)
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/me",
  })

  router.get("/cart", getCart)

  app.use(router.routes()).use(router.allowedMethods())
}
