// place order body
const bodyOrder = {
  date: "2022-03-25",
  currencyId: "EUR",
  splrId: 1,
  products: [
    { id: 1, quantity: 5, price: 12 },
    { id: 2, quantity: 6, price: 16 },
  ],
  delivery_address: {
    street: "street",
    streetNr: "55AA",
    zip: "7878HG",
    country: "somewhere",
    cuty: "myCity",
  },
  boxes: [
    { bxId: 3, quantity: 2, price: 12 },
    { bxId: 5, quantity: 5, price: 95.5 },
  ],
}
const updateOrder = {
  delivery_address: {
    street: "street",
    streetNr: "55AA",
    zip: "7878HG",
    country: "somewhere",
    city: "newCity",
  },
  boxes: [
    { bxId: 3, quantity: 2, price: 12 },
    { bxId: 5, quantity: 5, price: 95.5 },
  ],
}

const updateCartBody = [
  { prdctId: 1, quantity: 1 },
  { prdctId: 2, quantity: 2 },
]
