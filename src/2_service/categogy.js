const { getLogger } = require("../core/logger")
const categoryRepository = require("../1_repository/category")
const ServiceError = require("../core/serviceError")
const { Model } = require("sequelize")
const DEFAULT_TAKE = 20
const DEFAULT_SKIP = 0

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getAll = async (query) => {
  const skip = Number(query.skip) || DEFAULT_SKIP
  const take = Number(query.take) || DEFAULT_TAKE

  debugLog(`Fetching all categories, skip ${skip}, take ${take}`)
  const { count, categories } = await categoryRepository.getAll(skip, take)

  return { skip, take, count, categories }
}

module.exports = { getAll }
