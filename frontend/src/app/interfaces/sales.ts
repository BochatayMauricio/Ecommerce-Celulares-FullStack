export interface sales {
  idCustomer: number, //PK
  idProduct: number, //PK
  quantity: number,
  idShipping: number| null, //FK, ALLOW NULL
}