const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const createDeliveryAddress = async (
  ordrId,
  deliveryServiceId,
  street,
  streetNr,
  zip,
  country
) => {
  try {
    await getPrisma()[tables.delivery_address].create({
      data: {
        ordrId: ordrId.id,
        dsId: deliveryServiceId,
        street,
        streetNr,
        zip,
        country,
      },
    })
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in creating delivery address", {
      error,
    })
    throw error
  }
}

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
  createDeliveryAddress,
}
