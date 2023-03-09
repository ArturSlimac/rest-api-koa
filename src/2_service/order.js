const { getLogger } = require("../core/logger")
const orderRepository = require("../1_repository/order")
const ServiceError = require("../core/serviceError")
const DEFAULT_TAKE = 20
const DEFAULT_SKIP = 0
const DEFAULT_STATUS_TO_BE_CHANGED = "placed"

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getAll = async (testCustomer, query) => {
  const skip = Number(query.skip) || DEFAULT_SKIP
  const take = Number(query.take) || DEFAULT_TAKE

  debugLog(
    `Fetching all orders for user ${testCustomer}, skip ${skip}, take ${take}`
  )
  const { count, orders } = await orderRepository.getAll(
    testCustomer,
    skip,
    take
  )

  return { skip, take, count, orders }
}

const getById = async (testCustomer, params) => {
  const id = Number(params.id)

  debugLog(`Fetching order with ID ${id} for user ${testCustomer}`)
  const order = await orderRepository.getById(testCustomer, id)

  if (!order) {
    throw ServiceError.notFound(`There is no order with id ${id}`, {
      id,
    })
  }

  return order
}

const create = async (
  testCustomer,
  { date, currencyId, deliveryServiceId, products, delivery_address, boxes }
) => {
  debugLog(`Creating a new order for user ${testCustomer}`, {
    date,
    currencyId,
    products,
  })
  const ordrId = await orderRepository.create(testCustomer, {
    date,
    currencyId,
    deliveryServiceId,
    products,
    delivery_address,
    boxes,
  })
}

const updateById = async (params, { delivery_address, boxes }) => {
  const id = Number(params.id)

  const { status } = await orderRepository.getStatusById(id)

  if (status !== DEFAULT_STATUS_TO_BE_CHANGED) {
    throw ServiceError.forbidden(
      `The order ${id} cannot be changed because the status is not ${DEFAULT_STATUS_TO_BE_CHANGED} anymore`,
      {
        id,
        status,
      }
    )
  }

  debugLog(`Updating order with id ${id}`, {
    delivery_address,
    boxes,
  })

  await orderRepository.updateById({ id, delivery_address, boxes })
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
}
