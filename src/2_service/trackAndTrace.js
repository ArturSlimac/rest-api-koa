const { getLogger } = require("../core/logger")
const tAndTRepository = require("../1_repository/trackAndTrace")
const ServiceError = require("../core/serviceError")

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger()
  this.logger.debug(message, meta)
}

const getStatusByTTCodeVerCode = async ({
  tt: trackAndTrace,
  v: verification,
}) => {
  debugLog(
    `Getting status for TandT code ${trackAndTrace} with verification ${verification}`
  )
  const order = await tAndTRepository.getStatusByTTCodeVerCode(
    trackAndTrace,
    verification
  )

  if (!order) {
    throw ServiceError.notFound(
      `Either track-and-trace code or verification code is wrong`
    )
  }

  return order
}

module.exports = {
  getStatusByTTCodeVerCode,
}
