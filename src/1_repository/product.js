const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getAll = async (skip, take) => {
  try {
    const products = await getPrisma()[tables.product].findMany({
      skip,
      take,
      select: {
        id: true,
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
        product_images: {
          select: {
            image: {
              select: { link: true },
            },
          },
        },
      },
    })
    const totalAmountofProducts = await getPrisma()[tables.product].count()

    const count = products?.length || 0

    const formattedProducts = imgLinksFormatter(products)

    return { totalAmountofProducts, count, products: formattedProducts }
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
        product_images: {
          select: {
            image: {
              select: { link: true },
            },
          },
        },
      },
    })
    const formattedProduct = imgLinksFormatter([product])
    return formattedProduct
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

//helpers
const imgLinksFormatter = (products) => {
  return products.map((product) => ({
    ...product,
    product_images: product.product_images.map((image) => image.image.link),
  }))
}

module.exports = {
  getAll,
  getById,
  updateQuantity,
}
