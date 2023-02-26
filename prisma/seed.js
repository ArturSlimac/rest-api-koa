const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.product.upsert({
    where: { productId: "PIN01" },
    update: {},
    create: {
      productId: "PIN01",
      unitOfMeasureId: "EA",
      productAvailability: "STOCK",
      unitsInStock: 100,
      imgLink: "linkToIMG",

      ProductDescription: {
        create: {
          languageId: "nl",
          productName: "PINATA",
          productListerDescription: "Error during translation",
          productShortDescription: "Error during translation",
          productLongDescription: "Error during translation",
        },
      },
      ProductPrice: {
        create: {
          currencyId: null,
          price: null,
          unitOfMeasureId: null,
          quantity: null,
        },
      },
      Product_unit_of_measure_conversion: {
        create: {
          fromUnitOfMeasure: "EA",
          toUnitOfMeasure: "EA",
          fromQuantity: 10.0,
          toQuantity: 10.0,
        },
      },
    },
  })

  console.log({ alice })
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
