const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getAllAvailableBoxes = async () => {
  try {
    const boxes = await getPrisma()[tables.box].findMany({
      where: { isActiveForDeliveries: true },
      select: {
        id: true,
        name: true,
        type: true,
        width: true,
        height: true,
        length: true,
        price: true,
      },
    })
    const count = boxes?.length || 0
    return { count, boxes }
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in fetching all boxes", {
      error,
    })
    throw error
  }
}

const getAvailableBoxesByType = async (type) => {
  try {
    const boxes = await getPrisma()[tables.box].findMany({
      where: { type, isActiveForDeliveries: true },
      select: {
        id: true,
        name: true,
        type: true,
        width: true,
        height: true,
        length: true,
        price: true,
      },
    })
    const count = boxes?.length || 0
    return { count, boxes }
  } catch (error) {
    const logger = getLogger()
    logger.error(`Error in fetching all boxes type ${type}`, {
      error,
    })
    throw error
  }
}

module.exports = {
  getAllAvailableBoxes,
  getAvailableBoxesByType,
}
