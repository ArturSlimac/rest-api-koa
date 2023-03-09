const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getDeliveryAddressByOrderId = async (ordrId) => {
  try {
    const address = await getPrisma()[tables.delivery_address].findFirst({
      where: { ordrId },
    })
    return address
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in creating delivery address", {
      error,
    })
    throw error
  }
}

module.exports = {
  getDeliveryAddressByOrderId,
}
