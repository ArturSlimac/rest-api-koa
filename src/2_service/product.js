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
  const skip = Number(query.skip) || DEFAULT_SKIP
  const take = Number(query.take) || DEFAULT_TAKE

  debugLog(`Fetching all products, skip ${skip}, take ${take}`)
  const { count, products } = await productRepository.getAll(skip, take)

  return { skip, take, count, products }
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
