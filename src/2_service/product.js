const { getLogger } = require("../core/logger")
const productRepository = require("../1_repository/product")
const DEFAULT_TAKE = 20
const DEFAULT_PAGE = 1

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getAll = async (query) => {
  const page = Number(query.page) || DEFAULT_PAGE
  const take = Number(query.take) || DEFAULT_TAKE

  debugLog(`Fetching all products for page ${page}, take ${take}`)
  const { amount, products } = await productRepository.getAll(page, take)

  return { page, take, amount, products }
}

const getById = async (params) => {
  const id = Number(params.id)

  debugLog(`Fetching product with ID ${id}`)
  const product = await productRepository.getById(id)

  return product
}

module.exports = {
  getAll,
  getById,
}
