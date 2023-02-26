const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getAll = async (page, take) => {
  const products = await getPrisma()[tables.product].findMany({
    skip: (page - 1) * take,
    take: take,
    include: {
      ProductDescription: {
        select: { languageId: true, productName: true },
      },
      ProductPrice: {
        select: { price: true, unitOfMeasureId: true },
      },
    },
  })
  const amount = products.length
  return { amount, products }
}

module.exports = {
  getAll,
}
