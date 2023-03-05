const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { tables } = require("../src/0_data/index")
const { faker } = require("@faker-js/faker")
const shortid = require("shortid")

async function main() {
  await seedProductCategory("category1")
  await seedProductCategory("category2")

  await seedCustomer()
  await seedCustomer()
  await seedCustomer()
}

const seedProductCategory = async (categoryId) => {
  await prisma[tables.product_category].create({
    data: {
      categoryId,
      name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
    },
  })
  Array.from([1, 2, 3, 4, 5, 6]).forEach((_) => seedProduct(categoryId))
}

const seedProduct = async (categoryId) => {
  const productId = shortid.generate()
  await prisma[tables.product].create({
    data: {
      productId,
      categoryId: categoryId,
      unitOfMeasureId: "EA",
      productAvailability: "STOCK",
      unitsInStock: 100,
      imgLink: faker.image.cats(),
      description: {
        create: {
          languageId: "nl",
          productName: faker.commerce.productName(),
          lister: faker.commerce.productDescription(),
          short: faker.commerce.productDescription(),
          long: faker.commerce.productDescription(),
        },
      },
      price: {
        create: {
          currencyId: "EUR",
          price: Number(faker.commerce.price()),
          unitOfMeasureId: "EA",
          quantity: 1,
        },
      },
    },
  })
}

const seedCustomer = async () => {
  const customerId = shortid.generate()
  await prisma[tables.customer].create({
    data: {
      customerId,
      logoLink: faker.internet.avatar(),
      phoneNr: faker.phone.number("+32 ### ## ## ##"),
      street: faker.address.street(),
      streetNr: faker.phone.number("##"),
      country: faker.address.country(),
      city: faker.address.cityName(),
      zipCode: faker.address.zipCode(),
    },
  })

  Array.from([1, 2, 3, 4, 5]).forEach((_) => seedPurchaser(customerId))
}

const seedPurchaser = async (customerId) => {
  const purchaserId = shortid.generate()

  await prisma[tables.purchaser].create({
    data: {
      customerId,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phoneNumber: faker.phone.number("+32 ### ## ## ##"),
      purchaserId,
    },
  })

  seedCart(purchaserId)
}

const seedCart = async (purchaserId) => {
  const { cartId } = await prisma[tables.cart].create({
    data: {
      purchaserId,
      isPurchased: false,
    },
    select: { cartId: true },
  })

  seedCartItem(cartId)
}

const seedCartItem = async (cartId) => {
  const productIds = await prisma[tables.product].findMany({
    select: { productId: true },
  })

  productIds.forEach(async ({ productId }) => {
    await prisma[tables.cart_items].create({
      data: {
        cartId,
        productId,
        quantity: Number(faker.random.numeric()),
      },
    })
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
