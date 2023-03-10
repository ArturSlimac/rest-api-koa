const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getAll = async (skip, take) => {
  try {
    const notifications = await getPrisma()[tables.notification].findMany({
      skip,
      take,
      select: {
        date: true,
        status: true,
        ordrId: true,
      },
    })

    const count = notifications?.length || 0
    return { count, notifications }
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in getting all notifications", {
      error,
    })
    throw error
  }
}

module.exports = {
  getAll,
}
