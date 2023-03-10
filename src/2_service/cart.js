const { getLogger } = require("../core/logger")
const cartRepository = require("../1_repository/cart")

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getForUser = async (id) => {
  debugLog(`Fetching cart for user with ID ${id}`)
  const { count, cart } = await cartRepository.getForUser(id)

  return { count, cart }
}

const postItemsInCart = async (testPurchaser, body) => {
  debugLog(`Post items in cart for user with ID ${testPurchaser}`, { body })
  await cartRepository.postItemsInCart(testPurchaser, body)
}

const mergeLocalAndDdCarts = async (testPurchaser, body) => {
  debugLog(
    `Merge provided cart items and cart in db for user with ID ${testPurchaser}`,
    { ...body }
  )
  await cartRepository.mergeLocalAndDdCarts(testPurchaser, body)
}

module.exports = {
  getForUser,
  mergeLocalAndDdCarts,
  postItemsInCart,
}
