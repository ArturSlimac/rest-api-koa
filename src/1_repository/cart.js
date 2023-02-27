const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getSavedCartForUser = async (withId) => {
  try {
    const cart = await getPrisma()[tables.cart].findFirst({
      where: { purchaserId: withId },
      include: {
        Cart_items: {
          select: { productId: true, quantity: true },
        },
      },
    })
    const count = cart.length
    return { count, cart }
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in finding cart", {
      error,
    })
    throw error
  }
}

const updateCart = async (id, body) => {
  const cartId = await getCartIdByUserId(id)

  const productsWithCartID = Object.entries(body).map(([_, obj]) => ({
    ...obj,
    cartId,
  }))

  try {
    productsWithCartID.forEach(async ({ productId, quantity, cartId }) => {
      await getPrisma()[tables.cart_items].upsert({
        where: {
          cartId_productId: { productId, cartId },
        },
        update: { quantity },
        create: {
          productId,
          quantity,
          cartId,
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
const getCartIdByUserId = async (id) => {
  try {
    const { cartId } = await getPrisma()[tables.cart].upsert({
      where: { purchaserId: id },
      update: {},
      create: {
        purchaserId: id,
        isPurchased: false,
      },
      select: { cartId: true },
    })

    return cartId
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
