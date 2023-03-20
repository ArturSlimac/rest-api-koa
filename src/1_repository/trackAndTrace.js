const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getStatusByTTCodeVerCode = async (trackAndTrace, verification) => {
  try {
    const test = await getPrisma()[tables.trackandtrace].findUnique({
      where: {
        trackcode_verification: { trackcode: trackAndTrace, verification },
      },
      select: {
        trackcode: true,
        order: {
          select: {
            status: true,
          },
        },
      },
    })

    return test
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in getting track-and-trace info", {
      error,
    })
    throw error
  }
}

module.exports = {
  getStatusByTTCodeVerCode,
}
