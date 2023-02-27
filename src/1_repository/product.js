const { getPrisma, tables } = require("../0_data/index")

const getAll = async (page, take) => {
  const products = await getPrisma()[tables.product].findMany({
    skip: (page - 1) * take,
    take: take,
    include: {
      ProductPrice: {
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
      ProductDescription: {
        select: { languageId: true, productName: true },
      },
      ProductPrice: {
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
