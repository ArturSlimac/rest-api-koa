const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getForUser = async (withId) => {
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

const postItemsInCart = async (testPurchaser, body) => {
  const crtId = await getCartIdByUserId(testPurchaser)

  try {
    await getPrisma()[tables.cart].update({
      where: { id: crtId },
      data: {
        cart_items: {
          deleteMany: {},
          createMany: {
            data: [...body],
          },
        },
      },
    })
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in posting cart", {
      error,
    })
    throw error
  }
}

const mergeLocalAndDdCarts = async (testPurchaser, body) => {
  console.log(body)
  const crtId = await getCartIdByUserId(testPurchaser)
  try {
    body.forEach(async ({ prdctId, quantity }) => {
      await getPrisma()[tables.cart_items].upsert({
        where: { crtId_prdctId: { crtId, prdctId } },
        update: { quantity },
        create: {
          prdctId,
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
  getForUser,
  mergeLocalAndDdCarts,
  postItemsInCart,
}
