const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getSavedCartForUser = async (withId) => {
  try {
    const cart = await getPrisma()[tables.cart].findFirst({
      where: { prchsrId: withId },
      include: {
        cart_items: {
          select: { prdctId: true, quantity: true },
        },
      },
    })
    const count = cart?.Cart_items?.length || 0
    return { count, cart }
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in finding cart", {
      error,
    })
    throw error
  }
}

const updateCart = async (testUser, body) => {
  const crtId = await getCartIdByUserId(testUser)
  try {
    body.items.forEach(async ({ id, quantity }) => {
      await getPrisma()[tables.cart_items].upsert({
        where: {
          crtId_prdctId: { prdctId: id, crtId },
        },
        update: { quantity },
        create: {
          prdctId: id,
          quantity,
          crtId,
        },
      })
    })
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in updating cart", {
      error,
    })
    throw error
  }
}

//helper
//if cart is not in db the func will create it
const getCartIdByUserId = async (prchsrId) => {
  try {
    const { id } = await getPrisma()[tables.cart].upsert({
      where: { prchsrId },
      update: {},
      create: {
        prchsrId,
        isPurchased: false,
      },
      select: { id: true },
    })

    return id
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in getting cartId", {
      error,
    })
    throw error
  }
}

module.exports = {
  getSavedCartForUser,
  updateCart,
}
