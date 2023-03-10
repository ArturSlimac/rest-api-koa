const config = require("config")
const { getLogger } = require("../core/logger")
const { PrismaClient } = require("@prisma/client")

let prisma

const prismaLogger = (logger, level) => (message) => {
  if (message.sql) {
    logger.log(level, message.sql)
  } else {
    logger.log(level, JSON.stringify(message))
  }
}

const initializeDatabase = async () => {
  const logger = getLogger()
  logger.info("Initializing connection to the database")

  prisma = new PrismaClient()
  // control if db up and runs
  try {
    await prisma.$connect()
  } catch (error) {
    logger.error(error.message, { error })
    throw new Error("Could not initialize the data layer")
  }
}

function getPrisma() {
  if (!prisma)
    throw new Error(
      "Please initialize the data layer before getting the Prisma instance"
    )
  return prisma
}

async function shutdownData() {
  const logger = getLogger()

  logger.info("Shutting down database connection")

  await prisma.$disconnect()
  prisma = null

  logger.info("Database connection closed")
}

const tables = Object.freeze({
  product: "product",
  product_category: "product_category",
  product_description: "product_description",
  product_price: "product_price",
  price_conversion: "product_unit_of_measure_conversion",
  company: "company",
  purchaser: "purchaser",
  cart: "cart",
  cart_items: "cart_items",
  order: "order",
  order_item: "order_item",
  delivery_address: "delivery_address",
  box: "box",
  box_order: "box_order",
  notification: "notification",
})

const statusesOrder = Object.freeze({
  ordered: "ordered",
  processed: "processed",
  shipped: "shipped",
  out_for_delivery: "out_for_delivery",
  delivered: "delivered",
})

const statusesNotification = Object.freeze({
  read: "read",
  unread: "unread",
  new: "new",
})

module.exports = {
  initializeDatabase,
  getPrisma,
  tables,
  shutdownData,
  statusesOrder,
  statusesNotification,
}
