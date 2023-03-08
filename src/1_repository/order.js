const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getAll = async (skip, take) => {
  try {
    const orders = await getPrisma()[tables.order].findMany({ skip, take })
    const count = orders?.length || 0
    return { count, orders }
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in fetching all orders", {
      error,
    })
    throw error
  }
}

const getById = async (id) => {
  try {
    const order = await getPrisma()[tables.order].findUnique({
      where: { orderId: id },
    })

    return order
  } catch (error) {
    const logger = getLogger()
    logger.error(`Error in getting order with id ${id}`, {
      error,
    })
    throw error
  }
}

const createOrder = async ({ date, currencyId, products }) => {
  const status = "placed"
  const customerId = "lEji6rndqM"
  const taxAmount = 125
  try {
    const orderId = await getPrisma()[tables.order].create({
      data: {
        currencyId,
        customerId,
        orderPostedDate: date,
        status,
        taxAmount,
      },
      select: { orderId: true },
    })
    console.log(products)
    products.forEach(async ({ id, quantity }) => {
      await getPrisma()[tables.order_item].create({
        data: {
          orderId,
          productId: id,
          quantity,
        },
      })

      await getPrisma()[tables.product].update({
        where: {
          productId,
        },
        data: {
          unitsInStock: {
            decrement: quantity,
          },
        },
      })
    })
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in placing order", {
      error,
    })
    throw error
  }
}

module.exports = {
  getAll,
  getById,
  createOrder,
}
