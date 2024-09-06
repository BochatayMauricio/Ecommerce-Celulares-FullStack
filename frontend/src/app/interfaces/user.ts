export interface user {
  id?: number, //PK, Autoincremental
  password: string
  email: string, //Unique 
  dni: string,
  name: string,
  surname: string,
  isAdmin: boolean,
  createdAt?:string
}