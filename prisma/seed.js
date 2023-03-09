const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { tables } = require("../src/0_data/index")
const { faker } = require("@faker-js/faker")
const shortid = require("shortid")

async function main() {
  //clean up db before seeding
  await cleanUpDb()

  //categories
  const ctgrId = await seedProductCategory("category1")
  const ctgrId1 = await seedProductCategory("category2")

  //products
  Array.from([1, 2, 3, 4, 5, 6]).forEach((_) => seedProduct(ctgrId))
  Array.from([1, 2, 3, 4, 5]).forEach((_) => seedProduct(ctgrId1))

  //customers
  const cstmrId = await seedCustomer()
  const cstmrId1 = await seedCustomer()
  const cstmrId2 = await seedCustomer()

  //purchasers
  const amountOfPurchasers = [1, 2, 3]
  const prchsrIds = await getPrchsrIds(amountOfPurchasers, cstmrId)

  const amountOfPurchasers1 = [1, 2, 3, 4]
  const prchsrIds1 = await getPrchsrIds(amountOfPurchasers1, cstmrId1)

  const amountOfPurchasers2 = [1, 2, 3, 4, 5, 6]
  const prchsrIds2 = await getPrchsrIds(amountOfPurchasers2, cstmrId2)

  //carts for the purchasers
  prchsrIds.forEach(async (prchsrId) => await seedCart(prchsrId))
  prchsrIds1.forEach(async (prchsrId) => await seedCart(prchsrId))
  prchsrIds2.forEach(async (prchsrId) => await seedCart(prchsrId))
}

const seedProductCategory = async (categoryId) => {
  const { id } = await prisma[tables.product_category].create({
    data: {
      categoryId,
      name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
    },
    select: { id: true },
  })
  return id
}

const seedProduct = async (ctgrId) => {
  const productId = shortid.generate()
  await prisma[tables.product].create({
    data: {
      productId,
      ctgrId,
      unitOfMeasureId: "EA",
      productAvailability: "STOCK",
      unitsInStock: 100,
      imgLink: faker.image.cats(),
      description: {
        create: {
          languageId: "nl",
          name: faker.commerce.productName(),
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
  const { id } = await prisma[tables.customer].create({
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
    select: {
      id: true,
    },
  })
  return id
}

const seedPurchaser = async (cstmrId) => {
  const purchaserId = shortid.generate()

  const { id } = await prisma[tables.purchaser].create({
    data: {
      cstmrId,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phoneNumber: faker.phone.number("+32 ### ## ## ##"),
      purchaserId,
    },
    select: { id: true },
  })
  return id
}

const seedCart = async (prchsrId) => {
  const { id } = await prisma[tables.cart].create({
    data: {
      prchsrId,
      isPurchased: false,
    },
    select: { id: true },
  })

  seedCartItem(id)
}

const seedCartItem = async (crtId) => {
  const prdctIds = await prisma[tables.product].findMany({
    select: { id: true },
  })
  console.log(prdctIds)
  prdctIds.forEach(async ({ id }) => {
    await prisma[tables.cart_items].create({
      data: {
        crtId,
        prdctId: id,
        quantity: Number(faker.random.numeric()),
      },
    })
  })
}

//helpers
const cleanUpDb = async () => {
  await prisma[tables.order_item].deleteMany()
  await prisma[tables.order].deleteMany()
  await prisma[tables.cart_items].deleteMany()
  await prisma[tables.cart].deleteMany()
  await prisma[tables.purchaser].deleteMany()
  await prisma[tables.customer].deleteMany()
  await prisma[tables.product_price].deleteMany()
  await prisma[tables.product_description].deleteMany()
  await prisma[tables.product].deleteMany()
  await prisma[tables.product_category].deleteMany()
}

const getPrchsrIds = async (amountOfPurchasers, cstmrId) => {
  return await amountOfPurchasers.reduce(async (previousPromise, _) => {
    let arr = await previousPromise

    const id = await seedPurchaser(cstmrId)
    arr.push(id)
    return arr
  }, Promise.resolve([]))
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
