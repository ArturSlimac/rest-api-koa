const { getLogger } = require("../core/logger")
const cartRepository = require("../1_repository/cart")

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getSavedCartForUser = async (id) => {
  debugLog(`Fetching cart for user with ID ${id}`)
  const { count, cart } = await cartRepository.getSavedCartForUser(id)

  return { count, cart }
}

const updateCart = async (id, body) => {
  debugLog(`Update cart for user with ID ${id}`, { ...body })
  await cartRepository.updateCart(id, body)
}

module.exports = {
  getSavedCartForUser,
  updateCart,
}
