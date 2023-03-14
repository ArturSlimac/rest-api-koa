const config = require("config")
const { getLogger } = require("../core/logger")
const { PrismaClient } = require("@prisma/client")
const Sequelize = require("sequelize")

const DATABASE_CLIENT = config.get("database.client")
const DATABASE_USERNAME = config.get("database.username")
const DATABASE_PASSWORD = config.get("database.password")
const DATABASE_HOST = config.get("database.host")
const DATABASE_PORT = config.get("database.port")
const DATABASE_DATABASE = config.get("database.name")

const dbLink = `${DATABASE_CLIENT}://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DATABASE}`

let prisma
let logger

const prismaLogger = (logger, level) => (message) => {
  if (message.sql) {
    logger.log(level, message.sql)
  } else {
    logger.log(level, JSON.stringify(message))
  }
}

const createTrigger = async () => {
  logger = getLogger()
  logger.info("Creating trigger to keep updates for orders")

  const sequelize = new Sequelize(dbLink)
  try {
    // Drop the trigger if it already exists
    await sequelize.query("DROP TRIGGER IF EXISTS test_trigger;")

    // Create the trigger
    await sequelize.query(`
      CREATE TRIGGER test_trigger
      AFTER UPDATE ON ${DATABASE_DATABASE}.${tables.order}
      FOR EACH ROW
      BEGIN
        INSERT INTO ${DATABASE_DATABASE}.${tables.notification}(date, status, ordrId)
        VALUES (NOW(),'new', OLD.id);
      END;
    `)
    logger.info("Trigger created successfully")
  } catch (error) {
    logger.error(error.message, { error })
    throw new Error("Could not create trigger")
  } finally {
    await sequelize.close()
  }
}

const initializeDatabase = async () => {
  logger = getLogger()
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
  imageLink: "imageLink",
  product_images: "product_images",
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
  createTrigger,
}
