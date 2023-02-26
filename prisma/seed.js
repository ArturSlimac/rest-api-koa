const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { tables } = require("../src/0_data/index")

async function main() {
  await seedProductCategory()
  await seedProducts()
  await seedProductDescription()
  await seedProductPrice()
  await seedCustomer()
  await seedPurchaser()
  await seedCart()
  await seedCartItem()
}

const seedProductCategory = async () => {
  await prisma[tables.product_category].upsert({
    where: { categoryId: "testCat1" },
    update: {},
    create: {
      categoryId: "testCat1",
      name: "testCatName1",
    },
  })

  await prisma[tables.product_category].upsert({
    where: { categoryId: "testCat2" },
    update: {},
    create: {
      categoryId: "testCat2",
      name: "testCatName2",
    },
  })
}

const seedProducts = async () => {
  await prisma[tables.product].upsert({
    where: { productId: "testProd1" },
    update: {},
    create: {
      productId: "testProd1",
      categoryId: "testCat1",
      unitOfMeasureId: "EA",
      productAvailability: "STOCK",
      unitsInStock: 100,
      imgLink: "linkToIMG",
    },
  })

  await prisma[tables.product].upsert({
    where: { productId: "testProd2" },
    update: {},
    create: {
      productId: "testProd2",
      categoryId: "testCat2",
      unitOfMeasureId: "EA",
      productAvailability: "ORDER",
      unitsInStock: 0,
      imgLink: "linkToIMG",
    },
  })
}

const seedProductDescription = async () => {
  await prisma[tables.product_description].upsert({
    where: { pdId: 1 },
    update: {},
    create: {
      productId: "testProd1",
      languageId: "nl",
      productName: "TESTTEST1nl",
      productListerDescription: "Error during translation",
      productShortDescription: "Error during translation",
      productLongDescription: "Error during translation",
    },
  })
  await prisma[tables.product_description].upsert({
    where: { pdId: 2 },
    update: {},
    create: {
      productId: "testProd1",
      languageId: "en",
      productName: "TESTTEST1en",
      productListerDescription: "Error during translation",
      productShortDescription: "Error during translation",
      productLongDescription: "Error during translation",
    },
  })

  await prisma[tables.product_description].upsert({
    where: { pdId: 3 },
    update: {},
    create: {
      productId: "testProd2",
      languageId: "en",
      productName: "TESTTEST2en",
      productListerDescription: "Error during translation",
      productShortDescription: "Error during translation",
      productLongDescription: "Error during translation",
    },
  })

  await prisma[tables.product_description].upsert({
    where: { pdId: 4 },
    update: {},
    create: {
      productId: "testProd2",
      languageId: "nl",
      productName: "TESTTEST2nl",
      productListerDescription: "Error during translation",
      productShortDescription: "Error during translation",
      productLongDescription: "Error during translation",
    },
  })
}

const seedProductPrice = async () => {
  await prisma[tables.product_price].upsert({
    where: { ppId: 1 },
    update: {},
    create: {
      productId: "testProd1",
      currencyId: "EUR",
      price: 12.5,
      unitOfMeasureId: "EA",
      quantity: 1,
    },
  })
  await prisma[tables.product_price].upsert({
    where: { ppId: 2 },
    update: {},
    create: {
      productId: "testProd2",
      currencyId: "EUR",
      price: 25,
      unitOfMeasureId: "EA",
      quantity: 1,
    },
  })
}

const seedCustomer = async () => {
  await prisma[tables.customer].upsert({
    where: { customerId: "test1" },
    update: {},
    create: {
      customerId: "test1",
      logoLink: "linkTest",
      phoneNr: "+7888888",
      street: "streetTest",
      streetNr: "54S",
      country: "Belgium",
      city: "Gent",
      zipCode: "9000",
    },
  })

  await prisma[tables.customer].upsert({
    where: { customerId: "test2" },
    update: {},
    create: {
      customerId: "test2",
      logoLink: "linkTest2",
      phoneNr: "+79999999",
      street: "streetTest2",
      streetNr: "S",
      country: "Neverland",
      city: "Gent2",
      zipCode: "90Z00",
    },
  })
}

const seedPurchaser = async () => {
  await prisma[tables.purchaser].upsert({
    where: { purchaserId: 1 },
    update: {},
    create: {
      purchaserId: 1,
      customerId: "test1",
    },
  })

  await prisma[tables.purchaser].upsert({
    where: { purchaserId: 2 },
    update: {},
    create: {
      purchaserId: 2,
      customerId: "test2",
    },
  })
}

const seedCart = async () => {
  await prisma[tables.cart].upsert({
    where: { cartId: 1 },
    update: {},
    create: {
      cartId: 1,
      purchaserId: 1,
      isPurchased: false,
    },
  })

  await prisma[tables.cart].upsert({
    where: { cartId: 2 },
    update: {},
    create: {
      cartId: 2,
      purchaserId: 2,
      isPurchased: false,
    },
  })
}

const seedCartItem = async () => {
  await prisma[tables.cart_items].upsert({
    where: { ci_id: 1 },
    update: {},
    create: {
      ci_id: 1,
      cartId: 1,
      productId: "testProd1",
      quantity: 10,
    },
  })

  await prisma[tables.cart_items].upsert({
    where: { ci_id: 2 },
    update: {},
    create: {
      ci_id: 2,
      cartId: 1,
      productId: "testProd2",
      quantity: 15,
    },
  })

  await prisma[tables.cart_items].upsert({
    where: { ci_id: 3 },
    update: {},
    create: {
      ci_id: 3,
      cartId: 2,
      productId: "testProd1",
      quantity: 20,
    },
  })

  await prisma[tables.cart_items].upsert({
    where: { ci_id: 4 },
    update: {},
    create: {
      ci_id: 4,
      cartId: 2,
      productId: "testProd2",
      quantity: 25,
    },
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
