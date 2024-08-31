export interface sales {
  idCustomer: number, //PK
  idProduct: number, //PK
  idDomicile:number,
  quantity: number,
  idShipping: number| null, //FK, ALLOW NULL
}