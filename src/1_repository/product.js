const { getPrisma, tables } = require("../0_data/index")

const getAll = async (skip, take) => {
  try {
    const products = await getPrisma()[tables.product].findMany({
      skip,
      take,
      include: {
        price: {
          select: { price: true, currencyId: true, unitOfMeasureId: true },
        },
      },
    })
    const count = products?.length || 0
    return { count, products }
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
      where: { id: id },
      include: {
        description: {
          select: {
            languageId: true,
            productName: true,
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

module.exports = {
  getAll,
  getById,
}
