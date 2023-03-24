const { getPrisma, tables, statusesOrder } = require("../0_data/index")
const { getLogger } = require("../core/logger")
const productRepository = require("../1_repository/product")
const purchaserRepository = require("../1_repository/purchaser")
const cartRepository = require("./cart")
const lodash = require("lodash")

const getAll = async (
  testPurchaser,
  skip,
  take,
  sort_by,
  order_by,
  id,
  status,
  purchaser = "",
  date
) => {
  status = getStatusesArray(status)
  const orderBy = getOrderByObject(sort_by, order_by)

  try {
    const cmpnId = await purchaserRepository.getCompanyId(testPurchaser)
    const where = getWhere(cmpnId, id, status, purchaser, date)
    const orders = await getPrisma()[tables.order].findMany({
      skip,
      take,
      where,
      select: {
        id: true,
        orderPostedDate: true,
        status: true,
        purchaser: { select: { firstName: true, lastName: true } },
      },
      orderBy,
    })

    const totalAmountofOrders = await getPrisma()[tables.order].count({
      where,
    })
    const count = orders?.length || 0

    return { totalAmountofOrders, count, orders }
  } catch (error) {
    const logger = getLogger()
    logger.error("Error in fetching all orders", {
      error,
    })
    throw error
  }
}

const getById = async (testPurchaser, id) => {
  try {
    const order = await getPrisma()[tables.order].findUnique({
      where: { id },
      select: {
        id: true,
        orderPostedDate: true,
        status: true,
        track_trace: {
          select: {
            trackcode: true,
          },
        },
        order_items: {
          select: {
            quantity: true,
            netPrice: true,
            product: {
              select: {
                description: {
                  select: { name: true },
                },
                product_images: {
                  select: { image: { select: { link: true } } },
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
              select: { type: true, id: true },
            },
          },
        },
      },
    })
    const { ...formattedOrder } = imgLinksFormatter([order])

    return formattedOrder["0"]
  } catch (error) {
    const logger = getLogger()
    logger.error(`Error in getting order with id ${id}`, {
      error,
    })
    throw error
  }
}

const create = async (
  testPurchaser,
  { date, currencyId, deliveryServiceId, products, delivery_address, boxes }
) => {
  const status = statusesOrder.ordered
  const taxAmount = 125
  try {
    products.forEach(async ({ prdctId, quantity }) => {
      await productRepository.updateQuantity(prdctId, quantity)
    })

    await getPrisma()[tables.order].create({
      data: {
        currencyId,
        prchsrId: testPurchaser,
        orderPostedDate: date,
        status,
        taxAmount,
        delivery_address: {
          create: {
            ...delivery_address,
            dsId: deliveryServiceId,
          },
        },
        order_items: {
          createMany: { data: [...products] },
        },
        box_order: {
          createMany: { data: [...boxes] },
        },
      },
      select: { id: true },
    })

    //claen up cart
    await cartRepository.postItemsInCart(testPurchaser, [])
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

const imgLinksFormatter = (orders) => {
  return orders.map((order) => {
    const updatedOrderItems = order.order_items.map((orderItem) => {
      const productImageLinks = orderItem.product.product_images.map(
        (productImage) => {
          return productImage.image.link
        }
      )
      return {
        ...orderItem,
        product: {
          ...orderItem.product,
          product_images: productImageLinks,
        },
      }
    })
    return {
      ...order,
      order_items: updatedOrderItems,
    }
  })
}

const getStatusesArray = (status) => {
  const arrayOfStatuses = Object.values(statusesOrder)
  //by deafault all orders except "delivered" should be shown
  const statusesWithoutDelivered = lodash.pull(
    arrayOfStatuses,
    statusesOrder.delivered
  )
  return status ? [status] : statusesWithoutDelivered
}

const getOrderByObject = (sort_by, order_by = "desc") => {
  switch (sort_by) {
    case "id":
      return { id: order_by }
    case "status":
      return [{ status: order_by }, { orderPostedDate: "desc" }]
    case "date":
      return { orderPostedDate: order_by }
    case "purchaser":
      return [
        { purchaser: { lastName: order_by } },
        { purchaser: { firstName: order_by } },
      ]

    default:
      return { orderPostedDate: "desc" }
  }
}

const getWhere = (cmpnId, id, status, purchaser, date) => {
  providedDate = date && new Date(date)
  nextDay =
    providedDate &&
    new Date(new Date(providedDate).setDate(providedDate.getDate() + 1))
  return {
    AND: [
      { cmpnId },
      { status: { in: status } },
      {
        purchaser: {
          OR: [
            { firstName: { contains: purchaser } },
            { lastName: { contains: purchaser } },
          ],
        },
      },
      {
        orderPostedDate: {
          lt: nextDay,
          gte: providedDate,
        },
      },
      { id },
    ],
  }
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  getStatusById,
}
