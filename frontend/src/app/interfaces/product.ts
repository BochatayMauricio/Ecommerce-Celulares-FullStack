export interface product {
  id: number; //PK
  model: string;
  idBrand: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  quantity?:number;
  image: string;
  brand?:string;
}