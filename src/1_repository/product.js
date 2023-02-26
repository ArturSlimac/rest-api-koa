const { getPrisma, tables } = require("../0_data/index")

const getAll = async (page, take) => {
  const products = await getPrisma()[tables.product].findMany({
    skip: (page - 1) * take,
    take: take,
    include: {
      ProductDescription: true,
      ProductPrice: true,
      Product_unit_of_measure_conversion: true,
    },
  })

  return products
}

module.exports = {
  getAll,
}
