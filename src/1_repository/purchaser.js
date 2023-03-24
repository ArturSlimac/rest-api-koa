const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getProfile = async (testPurchaser) => {
  try {
    const profile = await getPrisma()[tables.purchaser].findUnique({
      where: { id: testPurchaser },
      select: {
        firstName: true,
        lastName: true,
        phoneNumber: true,
        company: {
          select: {
            name: true,
            logoLink: true,
            phoneNr: true,
            street: true,
            streetNr: true,
            country: true,
            city: true,
            zipCode: true,
            purchasers: {
              select: {
                firstName: true,
                lastName: true,
                phoneNumber: true,
              },
            },
          },
        },
      },
    })

    return profile
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in getting profile", {
      error,
    })
    throw error
  }
}

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

module.exports = { getCompanyId, getProfile }
