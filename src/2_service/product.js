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
  const products = await productRepository.getAll(page, take)

  return products
}

module.exports = {
  getAll,
}
