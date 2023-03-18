const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getAll = async (
  skip,
  take,
  categoryId,
  priceRange,
  nameLike,
  sort_by,
  order_by
) => {
  const gte = priceRange && priceRange[0] // price greater than or equal
  const lte = priceRange && priceRange[1] // price is less than or equal

  try {
    const products = await getPrisma()[tables.product].findMany({
      skip,
      take,
      where: { ctgrId: categoryId },
      where: {
        price: { some: { AND: [{ price: { gte } }, { price: { lte } }] } },
      },
      where: {
        description: {
          some: {
            name: {
              contains: nameLike,
            },
          },
        },
      },
      select: {
        id: true,
        unitsInStock: true,
        productAvailability: true,
        ctgrId: true,
        unitOfMeasureId: true,
        price: {
          where: { currencyId: "EUR" },
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
    const totalAmountofProducts = await getPrisma()[tables.product].count({
      where: { ctgrId: categoryId },
      where: {
        price: { some: { AND: [{ price: { gte } }, { price: { lte } }] } },
      },
      where: {
        description: {
          some: {
            name: {
              contains: nameLike,
            },
          },
        },
      },
    })

    const sortedProducts = sortProducts(products, sort_by, order_by || "asc")

    const formattedProducts = imgLinksFormatter(sortedProducts)

    const count = formattedProducts?.length || 0

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
    const [formattedProduct] = imgLinksFormatter([product])

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

const sortProducts = (products, sort_by, order_by) => {
  switch (sort_by) {
    case "price":
      return sortByPrice(products, order_by)
    case "category":
      return sortByCategoryId(products, order_by)
    default:
      return products
  }
}

const sortByCategoryId = (products, order_by) => {
  return products.sort((a, b) =>
    order_by === "asc" ? a.ctgrId - b.ctgrId : b.ctgrId - a.ctgrId
  )
}

const sortByPrice = (products, order_by) => {
  products.sort((a, b) => {
    const priceA = a.price[0].price
    const priceB = b.price[0].price
    if (priceA < priceB) {
      return order_by === "asc" ? -1 : 1
    }
    if (priceA > priceB) {
      return order_by === "asc" ? 1 : -1
    }
    return 0
  })
  return products
}

module.exports = {
  getAll,
  getById,
  updateQuantity,
}
