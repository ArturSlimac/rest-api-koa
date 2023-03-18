const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getAll = async (skip, take) => {
  try {
    const categories = await getPrisma()[tables.product_category].findMany({
      skip,
      take,
      select: {
        id: true,
        name: true,
      },
    })

    const count = categories?.length || 0

    return { count, categories }
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in getting all categories", {
      error,
    })
    throw error
  }
}

module.exports = {
  getAll,
}
