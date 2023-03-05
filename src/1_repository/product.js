const { getPrisma, tables } = require("../0_data/index")

const getAll = async (skip, take) => {
  const products = await getPrisma()[tables.product].findMany({
    skip,
    take,
    include: {
      price: {
        select: { price: true, currencyId: true, unitOfMeasureId: true },
      },
    },
  })
  const count = products.length
  return { count, products }
}

const getById = async (id) => {
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
}

module.exports = {
  getAll,
  getById,
}
