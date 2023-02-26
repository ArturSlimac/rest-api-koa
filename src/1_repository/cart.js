const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getSavedCartForUser = async (withId) => {
  const cart = await getPrisma()[tables.cart].findFirst({
    where: { purchaserId: withId },
    include: {
      Cart_items: {
        select: { productId: true, quantity: true },
      },
    },
  })

  return cart
}

module.exports = {
  getSavedCartForUser,
}
