const { getLogger } = require("../core/logger")
const notificationRepository = require("../1_repository/notification")
const DEFAULT_TAKE = 5
const DEFAULT_SKIP = 0

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getAll = async (query) => {
  const skip = Number(query.skip) || DEFAULT_SKIP
  const take = Number(query.take) || DEFAULT_TAKE

  debugLog(`Fetching all notifications, skip ${skip}, take ${take}`)
  const { count, notifications } = await notificationRepository.getAll(
    skip,
    take
  )

  return { skip, take, count, notifications }
}

module.exports = {
  getAll,
}
