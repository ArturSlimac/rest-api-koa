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

const createBox_order = async (bxId, quantity, price, ordrId) => {
  try {
    await getPrisma()[tables.box_order].create({
      data: {
        bxId,
        quantity,
        ordrId: ordrId.id,
        price,
      },
    })
  } catch (error) {
    const logger = getLogger()
    logger.error(`Error in creating box_order for ordrId ${ordrId}`, {
      error,
    })
    throw error
  }
}

module.exports = {
  getAllAvailableBoxes,
  getAvailableBoxesByType,
  createBox_order,
}
