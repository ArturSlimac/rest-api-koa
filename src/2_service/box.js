const { getLogger } = require("../core/logger")
const boxRepository = require("../1_repository/box")

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getAllAvailable = async () => {
  debugLog(`Fetching all boxes`)
  const { count, boxes } = await boxRepository.getAllAvailableBoxes()

  return { count, boxes }
}

const getByAvailableType = async (params) => {
  const type = params.type
  debugLog(`Fetching all boxes`)
  const { count, boxes } = await boxRepository.getAvailableBoxesByType(type)

  return { count, boxes }
}

module.exports = {
  getAllAvailable,
  getByAvailableType,
}
