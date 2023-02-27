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
npx prisma migrate dev --name init
```

- When npx prisma migrate dev is executed against a newly created database, seeding is also triggered. The seed file in prisma/seed.js will be executed and your database will be populated with the sample data.

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

- /api/products?take={take}&skip={skip} : Fetch all products

  - Query Parameters
    - take (optional, default=20): This specifies how many objects should be returned in the list
    - skip (optional): This specifies how many of the returned objects in the list should be skipped

- /api/products/:id : Fetch a single post by its id (id - primary key)

- /api/me/cart : returns all products that user has their cart

### PUT

- /api/me/cart update articles in user's cart
  - Body:
    - must be an array with objects
    - object:
      - productId: String (required): a real productId of the product (not a db id as in GET /api/products/:id)
      - quantity: Int (required)
