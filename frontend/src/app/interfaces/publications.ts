export interface publications {
  idAdministrator: number, //PK
  idProduct: number, //PK
  createdAt: Date, //PK
  updatedAt:Date,
  name?:string,
  email?:string,
  model?:string,
  image?:string
}