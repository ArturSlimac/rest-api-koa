const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

//helpers
const getCompanyId = async (testPurchaser) => {
  const { cmpnId } = await getPrisma()[tables.purchaser].findUnique({
    where: { id: testPurchaser },
    select: {
      company: { select: { id: true } },
    },
  })

  return cmpnId
}

module.exports = { getCompanyId }
