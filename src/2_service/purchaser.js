const { getLogger } = require("../core/logger")
const purchaserRepository = require("../1_repository/purchaser")

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getProfile = async (testPurchaser) => {
  debugLog(`Fetching profile for user ${testPurchaser}`)
  const profile = await purchaserRepository.getProfile(testPurchaser)
  return profile
}
module.exports = { getProfile }
