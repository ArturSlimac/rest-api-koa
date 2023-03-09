const { getPrisma, tables } = require("../0_data/index")
const { getLogger } = require("../core/logger")
const productRepository = require("../1_repository/product")

const getAll = async (testCustomer, skip, take) => {
  try {
    const orders = await getPrisma()[tables.order].findMany({
      skip,
      take,
      where: {
        cstmrId: testCustomer,
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

const getById = async (testCustomer, id) => {
  try {
    const order = await getPrisma()[tables.order].findUnique({
      where: { id },
      select: {
        id: true,
        orderPostedDate: true,
        status: true,
        track_trace: true,
        order_item: {
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
        delivery_address: {
          select: {
            dsId: true,
            street: true,
            streetNr: true,
            zip: true,
            country: true,
          },
        },
        box_order: {
          select: {
            quantity: true,
            price: true,
            box: {
              select: { type: true },
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

const create = async (
  testCustomer,
  { date, currencyId, deliveryServiceId, products, delivery_address, boxes }
) => {
  const status = "placed"
  const taxAmount = 125
  try {
    products.forEach(async ({ prdctId, quantity }) => {
      await productRepository.updateQuantity(prdctId, quantity)
    })

    await getPrisma()[tables.order].create({
      data: {
        currencyId,
        cstmrId: testCustomer,
        orderPostedDate: date,
        status,
        taxAmount,
        delivery_address: {
          create: {
            ...delivery_address,
            dsId: deliveryServiceId,
          },
        },
        order_item: {
          createMany: { data: [...products] },
        },
        box_order: {
          createMany: { data: [...boxes] },
        },
      },
      select: { id: true },
    })
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in placing order", {
      error,
    })
    throw error
  }
}

const updateById = async ({ id, delivery_address, boxes }) => {
  try {
    delivery_address &&
      (await getPrisma()[tables.order].update({
        where: { id },
        data: {
          delivery_address: {
            update: { where: { ordrId: id }, data: { ...delivery_address } },
          },
        },
      }))

    boxes &&
      (await getPrisma()[tables.order].update({
        where: { id },
        data: {
          box_order: {
            deleteMany: {},
            createMany: { data: [...boxes] },
          },
        },
      }))
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in updating order", {
      error,
    })
    throw error
  }
}

//helper
const getStatusById = async (id) =>
  await getPrisma()[tables.order].findUnique({
    where: { id },
    select: { status: true },
  })

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  getStatusById,
}
