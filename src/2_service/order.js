const { getLogger } = require("../core/logger")
const orderRepository = require("../1_repository/order")
const DEFAULT_TAKE = 20
const DEFAULT_SKIP = 0

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getAll = async (testUser, query) => {
  const skip = Number(query.skip) || DEFAULT_SKIP
  const take = Number(query.take) || DEFAULT_TAKE

  debugLog(
    `Fetching all orders for user ${testUser}, skip ${skip}, take ${take}`
  )
  const { count, orders } = await orderRepository.getAll(testUser, skip, take)

  return { skip, take, count, orders }
}

const getById = async (testUser, params) => {
  const id = Number(params.id)

  debugLog(`Fetching order with ID ${id} for user ${testUser}`)
  const order = await orderRepository.getById(testUser, id)

  return order
}

const createOrder = async (testUser, { date, currencyId, products }) => {
  debugLog(`Creating a new order for user ${testUser}`, {
    date,
    currencyId,
    products,
  })
  await orderRepository.createOrder(testUser, { date, currencyId, products })
}

module.exports = {
  getAll,
  getById,
  createOrder,
}
