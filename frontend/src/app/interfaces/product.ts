export interface product {
  id: number, //PK
  model: string,
  brand: string
  description: string,
  price: number;
  stock: number;
  createdAt: Date;
  quantity: number | null;
  image: string;
}