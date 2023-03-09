# 2023-backend-g2a4

# Getting started

## Clone the app and install dependencies

```
git clone https://github.com/HoGentProjectenII/2023-backend-g2a4.git
```

```
yarn install
```

## Create and seed the database

- Create .env file with following:

```
DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"
```

- You now need to adjust the connection URL to point to your own database.

- Run the following command to create your SQL database file

```
yarn prisma migrate dev --name init
```

- Run seeds. The seed file in prisma/seed.js will be executed and your database will be populated with the sample data. THIS WILL DELETE ALL DATA FROM THE DB BEFORE SEEDING

```
yarn prisma db seed
```

## Start the REST API server

- set via .env development mode

```
NODE_ENV = development
```

- run

```
yarn start
```

## Using the REST API

You can access the REST API of the server using the following endpoints:

### GET

- /api/products?take={`take`}&skip={`skip`} : Fetch all products

  - Query Parameters
    - `take` (optional, default=20): This specifies how many objects should be returned in the list
    - `skip` (optional): This specifies how many of the returned objects in the list should be skipped

- /api/products/`:id` : Fetch a single post by its `id` (`id` - primary key)

- /api/me/cart : returns all products that user has in their cart and info about the cart

- /api/me/orders/ : returns all orders that user has already made

- /api/me/orders/`:id` : returns one order with the `id`

### PUT

- /api/me/cart update articles in user's cart
  - Body:
    - must be an object with a name `items` and values as an array of `objects`
    - `objects`:
      - `id`: Int (required): a primary key of a product
      - `quantity`: Int (required)
    - example:
      ```
       {
        items: [
          { id: 1, quantity: 1 },
          { id: 2, quantity: 2 },
              ]
        }
      ```

### POST

- /api/me/orders/
  - Body:
    - `date`: String (required)
    - `currencyId`: String (required)
    - `deliveryServiceId`: Int (required)
    - `products`: Array of objects: {`id`: Int (required), `quantity`: Int (required), `price`: Float (required)}
    - `delivery_address`: Object {`street`: String (required),
      `streetNr`: String (required),
      `zip`: String (required),
      `country`: String (required)}
    - example:
    ```
    {
      date: "2022-03-25",
      currencyId: "EUR",
      deliveryServiceId: 5,
      products: [
         { id: 1, quantity: 5, price: 12 },
         { id: 2, quantity: 6, price: 16 },
                ],
      delivery_address: {
          street: "street",
          streetNr: "55AA",
          zip: "7878HG",
          country: "somewhere",
      },
      }
    ```
