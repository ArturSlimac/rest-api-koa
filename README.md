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
yarn prisma migrate dev
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

#### Products

- /api/products?filter={`"category"`:`ctgrId`, `"price"`:`[min,max]`, `"name"`:`name`}&`sort_by`=`sort`&`order_by`=`desc`&`take`=`take`&`skip`=`skip` : Fetch all products

  - Query Parameters

    - `take` : Int (optional, default=20): This specifies how many objects should be returned in the list
    - `skip` : Int (optional): This specifies how many of the returned objects in the list should be skipped
    - `filter` (optional): an object containing options for filtering

      - `category` : Int (Optional): `id` for the category productcs from whcih one should be returned
      - `price` : Array (optinal): range of price [``min``(includ), ``max``(include)] for which products should be selected
      - `name` : String (optional): can be used for serching through products by its names

    - `sort_by` : String (optional): provides sorting by `price` or `category`
    - `order_by` : String (optional): provides sorting `asc` (default) or `desc`

- /api/products/`:id` : Fetch a single post by its `id` (`id` - primary key)

#### Categories

- /api/categories?take={`take`}&skip={`skip`} : Fetch all categories

  - Query Parameters
    - `take` (optional, default=20): This specifies how many objects should be returned in the list
    - `skip` (optional): This specifies how many of the returned objects in the list should be skipped

#### Boxes

- /api/boxes/ : returns all avaliable boxes

- /api/boxes/`:id` : returns one box with the given `id`

#### Cart

- /api/me/cart : returns all products that user has in their cart and info about the cart

#### Orders

- /api/me/orders/filter={`"id"`:`id`, `"date"`:`"date"`, `"status"`:`status`, `"purchaser"`:`purchaser`}&`sort_by`=`sort`&`order_by`=`desc`&`take`=`take`&`skip`=`skip` : returns ALL orders that are not delivered yet of the entire company, not just purchaser's own purchases

  - Query Parameters

    - `take` (optional, default=20): This specifies how many objects should be returned in the list
    - `skip` (optional): This specifies how many of the returned objects in the list should be skipped
    - `filter` (optional): an object containing options for filtering

      - `id` : Int (Optional): `id` of the order
      - `status` : String (optinal): status for which all orders should be shown
      - `date` : String (optional): date when some orders were made
      - `purchaser` : Int (optional): `id` if the purchaser all orders of who should be shown

    - `sort_by` : String (optional): provides sorting by `id`, `date`, `status` or `purchaser`
    - `order_by` : String (optional): provides sorting `asc` (default) or `desc`

- /api/me/orders/`:id` : returns one order with the `id`

#### Profile

- /api/me/profile : shows an overview of all company data as well as all data of all purchasers associated with that company

### PUT

#### Cart

- /api/me/cart : merge articles provided in body with articles in the cart in the db

  - Body:

    - must be an array of `objects`
    - `objects`:
      - `id`: Int (required): a primary key of a product
      - `quantity`: Int (required)
    - example:

      ```
        [
          { prdctId: 1, quantity: 1 },
          { prdctId: 2, quantity: 2 },
        ]

      ```

#### Orders

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

#### Orders

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

#### Cart

- /api/me/cart : overwrite items saved in db with provided items in body

  - Body:

    - must be an array of `objects`
    - `objects`:
      - `id`: Int (required): a primary key of a product
      - `quantity`: Int (required)
    - example:

      ```
        [
          { prdctId: 1, quantity: 1 },
          { prdctId: 2, quantity: 2 },
        ]

      ```

#### Track-and-Trace

- /api/track-and-trace : returns `status` of the order
  - Body:
    - `tt`: String (required): track-and-trace code
    - `v`: verification code

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
