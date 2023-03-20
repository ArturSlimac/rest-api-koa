const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { tables, statusesOrder } = require("../src/0_data/index")
const { faker } = require("@faker-js/faker")
const shortid = require("shortid")

async function main() {
  //clean up db before seeding
  await cleanUpDb()

  //categories
  const ctgrId = await seedProductCategory("category1")
  const ctgrId1 = await seedProductCategory("category2")

  //products with images
  Array.from([1, 2, 3, 4, 5, 6]).forEach((_) => seedProduct(ctgrId))
  Array.from([1, 2, 3, 4, 5]).forEach((_) => seedProduct(ctgrId1))

  //boxes
  const type1 = "generic"
  const amountOfBoxes1 = [1, 2, 3, 4]
  amountOfBoxes1.forEach(async (_) => await seedBoxes(type1))

  const type2 = "custom"
  const amountOfBoxes2 = [1, 2, 3, 4, 5, 6]
  amountOfBoxes2.forEach(async (_) => await seedBoxes(type2))

  //customers
  const cmpnId = await seedCompany()
  const cmpnId1 = await seedCompany()
  const cmpnId2 = await seedCompany()

  //purchasers
  const amountOfPurchasers = [1, 2, 3]
  const prchsrIds = await seedPrchsrIds(amountOfPurchasers, cmpnId)

  const amountOfPurchasers1 = [1, 2, 3, 4]
  const prchsrIds1 = await seedPrchsrIds(amountOfPurchasers1, cmpnId1)

  const amountOfPurchasers2 = [1, 2, 3, 4, 5, 6]
  const prchsrIds2 = await seedPrchsrIds(amountOfPurchasers2, cmpnId2)

  //carts for the purchasers
  prchsrIds.forEach(async (prchsrId) => await seedCart(prchsrId))
  prchsrIds1.forEach(async (prchsrId) => await seedCart(prchsrId))
  prchsrIds2.forEach(async (prchsrId) => await seedCart(prchsrId))

  //orders
  prchsrIds.forEach(async (prchsrId) => await seedOrders(prchsrId))
  prchsrIds1.forEach(async (prchsrId) => await seedOrders(prchsrId))
  prchsrIds2.forEach(async (prchsrId) => await seedOrders(prchsrId))
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
      product_images: {
        create: {
          image: {
            create: {
              link: faker.image.cats(),
            },
          },
        },
      },
    },
  })
}

const seedCompany = async () => {
  const companyId = shortid.generate()
  const { id } = await prisma[tables.company].create({
    data: {
      companyId,
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

const seedPurchaser = async (cmpnId) => {
  const purchaserId = shortid.generate()

  const { id } = await prisma[tables.purchaser].create({
    data: {
      cmpnId,
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

const seedBoxes = async (type) => {
  await prisma[tables.box].create({
    data: {
      name: faker.music.songName(),
      type,
      width: Number(faker.finance.amount(5, 200, 2)),
      height: Number(faker.finance.amount(5, 200, 2)),
      length: Number(faker.finance.amount(5, 200, 2)),
      price: Number(faker.commerce.price()),
      isActiveForDeliveries: true,
    },
  })
}

const seedOrders = async (prchsrId) => {
  const { id: prdctId } = await prisma[tables.product].findFirst({
    select: { id: true },
  })

  const { id: bxId } = await prisma[tables.product].findFirst({
    select: { id: true },
  })

  await prisma[tables.order].create({
    data: {
      currencyId: "EUR",
      prchsrId,
      orderPostedDate: faker.date.between(),
      status: statusesOrder.ordered,
      taxAmount: 125,
      track_trace: {
        create: {
          trackcode: shortid.generate(),
          verification: shortid.generate(),
        },
      },
      delivery_address: {
        create: {
          dsId: 5,
          street: faker.address.street(),
          streetNr: faker.phone.number("##"),
          zip: faker.address.zipCode(),
          country: faker.address.country(),
        },
      },
      order_items: {
        createMany: {
          data: [{ prdctId, quantity: 5, netPrice: 12 }],
        },
      },
      box_order: {
        createMany: {
          data: [{ bxId, quantity: 2, price: 12 }],
        },
      },
    },
  })
}

//helpers
const cleanUpDb = async () => {
  await prisma[tables.delivery_address].deleteMany()
  await prisma[tables.trackandtrace].deleteMany()
  await prisma[tables.order_item].deleteMany()
  await prisma[tables.box_order].deleteMany()
  await prisma[tables.box].deleteMany()
  await prisma[tables.cart_items].deleteMany()
  await prisma[tables.cart].deleteMany()
  await prisma[tables.order].deleteMany()
  await prisma[tables.purchaser].deleteMany()
  await prisma[tables.company].deleteMany()
  await prisma[tables.product_price].deleteMany()
  await prisma[tables.product_description].deleteMany()
  await prisma[tables.product_images].deleteMany()
  await prisma[tables.imageLink].deleteMany()
  await prisma[tables.product].deleteMany()
  await prisma[tables.product_category].deleteMany()
}

const seedPrchsrIds = async (amountOfPurchasers, cmpnId) => {
  return await amountOfPurchasers.reduce(async (previousPromise, _) => {
    let arr = await previousPromise

    const id = await seedPurchaser(cmpnId)
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
