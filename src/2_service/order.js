const { getLogger } = require("../core/logger")
const orderRepository = require("../1_repository/order")
const DEFAULT_TAKE = 20
const DEFAULT_SKIP = 0

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getAll = async (query) => {
  const skip = Number(query.skip) || DEFAULT_SKIP
  const take = Number(query.take) || DEFAULT_TAKE

  debugLog(`Fetching all orders, skip ${skip}, take ${take}`)
  const { count, orders } = await orderRepository.getAll(skip, take)

  return { skip, take, count, orders }
}

const getById = async (params) => {
  const id = Number(params.id)

  debugLog(`Fetching order with ID ${id}`)
  const order = await orderRepository.getById(id)

  return order
}

module.exports = {
  getAll,
  getById,
}
