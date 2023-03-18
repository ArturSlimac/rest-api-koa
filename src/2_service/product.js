const { getLogger } = require("../core/logger")
const productRepository = require("../1_repository/product")
const ServiceError = require("../core/serviceError")
const DEFAULT_TAKE = 20
const DEFAULT_SKIP = 0

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getAll = async (query) => {
  console.log(query)
  const skip = Number(query.skip) || DEFAULT_SKIP
  const take = Number(query.take) || DEFAULT_TAKE

  const filter = query.filter && JSON.parse(query.filter)
  const categoryId = filter?.category || undefined
  const priceRange = filter?.price || undefined
  const nameLike = filter?.name || undefined

  const { sort_by } = query || undefined
  const { order_by } = query || undefined

  debugLog(
    `Fetching all products, skip ${skip}, take ${take}, categoryId ${categoryId}, priceRange ${priceRange}, nameLike ${nameLike}, sort_by ${sort_by}, order_by ${order_by}`
  )
  const { totalAmountofProducts, count, products } =
    await productRepository.getAll(
      skip,
      take,
      categoryId,
      priceRange,
      nameLike,
      sort_by,
      order_by
    )

  return { totalAmountofProducts, skip, take, count, products }
}

const getById = async (params) => {
  const id = Number(params.id)

  debugLog(`Fetching product with ID ${id}`)
  const product = await productRepository.getById(id)
  if (!product) {
    throw ServiceError.notFound(`There is no product with id ${id}`, {
      id,
    })
  }

  return product
}

module.exports = {
  getAll,
  getById,
}
