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
DATABASE_URL="client://johndoe:randompassword@localhost:3306/mydb"

DATABASE_USERNAME = johndoe
DATABASE_PASSWORD = randompassword
DATABASE_HOST = localhost
DATABASE_PORT = 3306
DATABASE_NAME = mydb
DATABASE_CLIENT = client
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

- /api/boxes/ : returns all avaliable boxes

- /api/boxes/`:id` : returns one box with the given `id`
- /api/me/cart : returns all products that user has in their cart and info about the cart

- /api/me/orders/ : returns ALL orders of the entire company, not just purchaser's own purchases

- /api/me/orders/`:id` : returns one order with the `id`

- /api/me/profile : shows an overview of all company data as well as all data of all purchasers associated with that company

- /api/me/notifications?take={`take`}&skip={`skip`} : return an overview of notifications
  - Query Parameters
    - `take` (optional, default=5): This specifies how many objects should be returned in the list
    - `skip` (optional): This specifies how many of the returned objects in the list should be skipped

### PUT

- /api/me/cart : merge articles provided in body with articles in the cart in the db

  - Body:

    - must be an array of `objects`
    - `objects`:
      - `id`: Int (required): a primary key of a product
      - `quantity`: Int (required)
    - example:

      ```
        [
          { id: 1, quantity: 1 },
          { id: 2, quantity: 2 },
        ]

      ```

- /api/me/orders/`:id` : update the existing whith given `id`

  - Body:

    - `delivery_address`: Object {`street`: String (required),
      `streetNr`: String (required),
      `zip`: String (required),
      `country`: String (required)}
    - `boxes`: Array of ojects { `bxId`: Int (required), `quantity`: Int (required), `price`: Float (required)}
    - either `delivery_address` or `boxes` is required

  - example:

  ```
  {
    delivery_address: {
        street: "street",
        streetNr: "55AA",
        zip: "7878HG",
        country: "somewhere",
    },
     boxes: [
        { bxId: 3, quantity: 2, price: 12 },
        { bxId: 5, quantity: 5, price: 95.5 },
            ],
    }
  ```

### POST

- /api/me/orders/ : create an order in the db
  - Body:
    - `date`: String (required)
    - `currencyId`: String (required)
    - `deliveryServiceId`: Int (required)
    - `products`: Array of objects: {`id`: Int (required), `quantity`: Int (required), `price`: Float (required)}
    - `delivery_address`: Object {`street`: String (required),
      `streetNr`: String (required),
      `zip`: String (required),
      `country`: String (required)}
    - `boxes`: Array of ojects { `bxId`: Int (required), `quantity`: Int (required), `price`: Float (required)}
    - example:
    ```
    {
      date: "2022-03-25",
      currencyId: "EUR",
      deliveryServiceId: 5,
      products: [
         { prdctId: 1, quantity: 5, netPrice: 12 },
         { prdctId: 2, quantity: 6, netPrice: 16 },
                ],
      delivery_address: {
          street: "street",
          streetNr: "55AA",
          zip: "7878HG",
          country: "somewhere",
      },
       boxes: [
          { bxId: 3, quantity: 2, price: 12 },
          { bxId: 5, quantity: 5, price: 95.5 },
              ],
      }
    ```
- /api/me/cart : overwrite items saved in db with provided items in body

  - Body:

    - must be an array of `objects`
    - `objects`:
      - `id`: Int (required): a primary key of a product
      - `quantity`: Int (required)
    - example:

      ```
        [
          { id: 1, quantity: 1 },
          { id: 2, quantity: 2 },
        ]

      ```
# Testing
- First copy all the data of your database into a new database "mydb_test"

- Create a new file called .env.test containing the following:
```
DATABASE_URL="client://johndoe:randompassword@localhost:3306/mydb_test"
NODE_ENV=test

DATABASE_USERNAME = johndoe
DATABASE_PASSWORD = randompassword
DATABASE_HOST = localhost
DATABASE_PORT = 3306
DATABASE_NAME = mydb_test
DATABASE_CLIENT = client
```
- Run the following command in VSCode:
```
yarn test
```
