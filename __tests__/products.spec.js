const createServer = require("../src/createServer")
const supertest = require("supertest")
const { getPrisma } = require("../src/0_data/index")

describe("products", () => {
  let server, request, prisma

  beforeAll(async () => {
    server = await createServer()
    request = supertest(server.getApp().callback())
    prisma = getPrisma()
  })

  afterAll(async () => {
    await server.stop()
  })

  const url = "/api/products"

  describe("GET /api/products", () => {
    let response
    beforeAll(async () => {
      response = await request.get(url)
    })

    it("should 200 and contain all necessary properties", () => {
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('totalAmountofProducts');
      expect(response.body).toHaveProperty("count")
      expect(response.body).toHaveProperty("products")
      expect(response.body).toHaveProperty("take")
      expect(response.body).toHaveProperty("skip")
      expect(response.body.products[0]).toHaveProperty("id")
      expect(response.body.products[0]).toHaveProperty("product_images")
      expect(response.body.products[0]).toHaveProperty("unitsInStock")
      expect(response.body.products[0]).toHaveProperty("productAvailability")
      expect(response.body.products[0]).toHaveProperty("ctgrId")
      expect(response.body.products[0]).toHaveProperty("unitOfMeasureId")
      expect(response.body.products[0]).toHaveProperty("price")
      expect(response.body.products[0].price[0]).toHaveProperty("price")
      expect(response.body.products[0].price[0]).toHaveProperty("currencyId")
      expect(response.body.products[0].price[0]).toHaveProperty("unitOfMeasureId")
      expect(response.body.products[0]).toHaveProperty("description")
      expect(response.body.products[0].description[0]).toHaveProperty("name")
    })

    it("should 200 and return a max of 20 products with no offset", () => {
      expect(response.body.count).toBeLessThanOrEqual(20)
      expect(response.body.skip).toBe(0)
    })
  })

  describe("GET /api/products?take=10&skip=5", () => {
    let response
    beforeAll(async () => {
      response = await request.get(`${url}?take=10&skip=5`)
    })

    it("should 200 and return a max of 10 products with offset 5", async () => {
      expect(response.status).toBe(200)
      expect(response.body.count).toBeLessThanOrEqual(10)
      expect(response.body.take).toBe(10)
      expect(response.body.skip).toBe(5)
      const response2 = await request.get(url)
      expect(response.body.products[0]).toEqual(response2.body.products[5])
    })
  })

  describe("GET /api/products/:id", () => {
    it("should 200 and return the specific product", async () => {
      const response = await request.get(`${url}/1`)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("id")
      expect(response.body).toHaveProperty("product_images")
      expect(response.body).toHaveProperty("unitsInStock")
      expect(response.body).toHaveProperty("productAvailability")
      expect(response.body).toHaveProperty("ctgrId")
      expect(response.body).toHaveProperty("unitOfMeasureId")
      expect(response.body).toHaveProperty("price")
      expect(response.body.price[0]).toHaveProperty("price")
      expect(response.body.price[0]).toHaveProperty("currencyId")
      expect(response.body.price[0]).toHaveProperty("unitOfMeasureId")
      expect(response.body).toHaveProperty("description")
      expect(response.body.description[0]).toHaveProperty("languageId")
      expect(response.body.description[0]).toHaveProperty("name")
      expect(response.body.description[0]).toHaveProperty("lister")
      expect(response.body.description[0]).toHaveProperty("short")
      expect(response.body.description[0]).toHaveProperty("long")
    })
  })

  describe('Filtering', () => {
    describe('GET /api/products?filter={"category": 1}', () => {
      it('should 200 and return a list of products with category 1', async () => {
        const response = await request.get(`${url}?filter={"category": 1}`)
        expect(response.status).toBe(200)
        expect(response.body.count).toBeGreaterThanOrEqual(1);
        response.body.products.forEach(el => expect(el.ctgrId).toBe(1));
      })
    })
  
    describe('GET /api/products?filter={"price": [0, 200]}', () => {
      it('should 200 and return a list of products with a price between 0 and 200', async () => {
        const response = await request.get(`${url}?filter={"price": [0, 200]}`)
        expect(response.status).toBe(200)
        expect(response.body.count).toBeGreaterThanOrEqual(1);
        response.body.products.forEach(el => {
          expect(el.price[0].price).toBeGreaterThanOrEqual(0);
          expect(el.price[0].price).toBeLessThanOrEqual(200);
        });
      })
    })
  
    describe('GET /api/products?filter={"name": "Incr"}', () => {
      it('should 200 and return a list of products that start with "Incr"', async () => {
        const response = await request.get(`${url}?filter={"name": "Incr"}`)
        expect(response.status).toBe(200)
        expect(response.body.count).toBeGreaterThanOrEqual(1);
        response.body.products.forEach(el => {
          expect(el.description[0].name).toMatch(new RegExp('^Incr?'));
        });
      })
    })
  
    describe('GET /api/products?filter={"name": "Incr"}', () => {
      it('should 200 and return a list of products that start with "Incr"', async () => {
        const response = await request.get(`${url}?filter={"name": "Incr"}`)
        expect(response.status).toBe(200)
        expect(response.body.count).toBeGreaterThanOrEqual(1);
        response.body.products.forEach(el => {
          expect(el.description[0].name).toMatch(new RegExp('^Incr?'));
        });
      })
    })
  
    describe('GET /api/products?filter={"category": 1, "price": [0, 200]}', () => {
      it('should 200 and return a list of products with category 1 and a price between 0 and 200', async () => {
        const response = await request.get(`${url}?filter={"category": 1, "price": [0, 200]}`)
        expect(response.status).toBe(200)
        expect(response.body.count).toBeGreaterThanOrEqual(1);
        response.body.products.forEach(el => {
          expect(el.ctgrId).toBe(1)
          expect(el.price[0].price).toBeGreaterThanOrEqual(0);
          expect(el.price[0].price).toBeLessThanOrEqual(200);
        });
      })
    })
  })

  describe('Sorting', () => {
    describe('GET /api/products?sort_by=price', () => {
      it('should 200 and return a list of products sorted by price descending', async () => {
        const response = await request.get(`${url}?sort_by=price`)
        expect(response.status).toBe(200);
        for(let i = 0; i < response.body.products.length; i++) {
          if(i+1 >= response.body.products.length) continue;
          const current = response.body.products[i], next = response.body.products[i+1];
          expect(current.price[0].price).toBeLessThanOrEqual(next.price[0].price);
        }
      })
    })

    it('should 200 and return a list of products sorted by category descending', async () => {
      const response = await request.get(`${url}?sort_by=category`)
      expect(response.status).toBe(200);
      for(let i = 0; i < response.body.products.length; i++) {
        if(i+1 >= response.body.products.length) continue;
        const current = response.body.products[i], next = response.body.products[i+1];
        expect(current.ctgrId).toBeLessThanOrEqual(next.ctgrId);
      }
    })
  });
})
