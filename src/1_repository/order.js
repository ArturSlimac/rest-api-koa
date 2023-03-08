const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")

const getAll = async (testUser, skip, take) => {
  try {
    const orders = await getPrisma()[tables.order].findMany({
      skip,
      take,
      where: {
        cstmrId: testUser,
      },
      select: {
        id: true,
        orderPostedDate: true,
        status: true,
      },
    })
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

const getById = async (testUser, id) => {
  try {
    const order = await getPrisma()[tables.order].findUnique({
      where: { id },
      select: {
        id: true,
        orderPostedDate: true,
        status: true,
        track_trace: true,
        Order_item: {
          select: {
            quantity: true,
            netPrice: true,
            product: {
              select: {
                description: {
                  select: { name: true },
                },
              },
            },
          },
        },
      },
    })

    console.log(order)

    return order
  } catch (error) {
    const logger = getLogger()
    logger.error(`Error in getting order with id ${id}`, {
      error,
    })
    throw error
  }
}

const createOrder = async (testUser, { date, currencyId, products }) => {
  const status = "placed"
  const taxAmount = 125
  try {
    const ordrId = await getPrisma()[tables.order].create({
      data: {
        currencyId,
        cstmrId: testUser,
        orderPostedDate: date,
        status,
        taxAmount,
      },
      select: { id: true },
    })

    products.forEach(async ({ id, quantity, price }) => {
      await getPrisma()[tables.order_item].create({
        data: {
          ordrId: ordrId.id,
          prdctId: id,
          quantity,
          netPrice: price,
        },
      })

      await getPrisma()[tables.product].update({
        where: {
          id,
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
