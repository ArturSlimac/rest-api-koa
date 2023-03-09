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

const update = async (testPurchaser, body) => {
  debugLog(`Update cart for user with ID ${testPurchaser}`, { ...body })
  await cartRepository.update(testPurchaser, body)
}

module.exports = {
  getForUser,
  update,
}
