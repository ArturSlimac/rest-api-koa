const { getLogger } = require("../core/logger")
const orderRepository = require("../1_repository/order")
const ServiceError = require("../core/serviceError")
const { statusesOrder } = require("../0_data/index")
const DEFAULT_TAKE = 20
const DEFAULT_SKIP = 0
const DEFAULT_STATUS_TO_BE_CHANGED = statusesOrder.ordered

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getAll = async (testPurchaser, query) => {
  const skip = Number(query.skip) || DEFAULT_SKIP
  const take = Number(query.take) || DEFAULT_TAKE

  const filter = query.filter && JSON.parse(query.filter)
  const id = filter?.id || undefined
  const status = filter?.status || undefined
  const purchaser = filter?.purchaser || undefined
  const date = filter?.date || undefined

  const { sort_by } = query || undefined
  const { order_by } = query || undefined

  debugLog(
    `Fetching all orders for user ${testPurchaser}, skip ${skip}, take ${take}, , sort_by ${sort_by}, order_by ${order_by}, id ${id}, status ${status}, purchaser ${purchaser}, date ${date}`
  )
  const { totalAmountofOrders, count, orders } = await orderRepository.getAll(
    testPurchaser,
    skip,
    take,
    sort_by,
    order_by,
    id,
    status,
    purchaser,
    date
  )

  return { totalAmountofOrders, skip, take, count, orders }
}

const getById = async (testPurchaser, params) => {
  const id = Number(params.id)

  debugLog(`Fetching order with ID ${id} for user ${testPurchaser}`)
  const order = await orderRepository.getById(testPurchaser, id)

  if (!order) {
    throw ServiceError.notFound(`There is no order with id ${id}`, {
      id,
    })
  }

  return order
}

const create = async (
  testPurchaser,
  { date, currencyId, deliveryServiceId, products, delivery_address, boxes }
) => {
  debugLog(`Creating a new order for user ${testPurchaser}`, {
    date,
    currencyId,
    products,
  })
  const ordrId = await orderRepository.create(testPurchaser, {
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
