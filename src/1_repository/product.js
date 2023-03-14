const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getAll = async (skip, take) => {
  try {
    const products = await getPrisma()[tables.product].findMany({
      skip,
      take,
      select: {
        id: true,
        imgLink: true,
        unitsInStock: true,
        productAvailability: true,
        ctgrId: true,
        unitOfMeasureId: true,
        price: {
          select: { price: true, currencyId: true, unitOfMeasureId: true },
        },
        description: {
          select: { name: true },
        },
      },
    })
    const totalAmountofProducts = await getPrisma()[tables.product].count()

    const count = products?.length || 0
    return { totalAmountofProducts, count, products }
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in getting all products", {
      error,
    })
    throw error
  }
}

const getById = async (id) => {
  try {
    const product = await getPrisma()[tables.product].findUnique({
      where: { id },
      select: {
        id: true,
        unitOfMeasureId: true,
        productAvailability: true,
        unitsInStock: true,
        imgLink: true,
        ctgrId: true,
        description: {
          select: {
            languageId: true,
            name: true,
            lister: true,
            short: true,
            long: true,
          },
        },
        price: {
          select: { price: true, currencyId: true, unitOfMeasureId: true },
        },
      },
    })

    return product
  } catch (error) {
    const logger = getLogger()
    logger.error(`Error in getting product with id ${id}`, {
      error,
    })
    throw error
  }
}

const updateQuantity = async (id, quantity) => {
  try {
    await getPrisma()[tables.product].update({
      where: {
        id,
      },
      data: {
        unitsInStock: {
          decrement: quantity,
        },
      },
    })
  } catch (error) {
    const logger = getLogger()
    logger.error(`Error in updating unitsInStock for a product with id ${id}`, {
      error,
    })
    throw error
  }
}

module.exports = {
  getAll,
  getById,
  updateQuantity,
}
