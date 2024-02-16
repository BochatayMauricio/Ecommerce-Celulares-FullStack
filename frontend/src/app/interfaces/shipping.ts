export interface shipping {
  id: number, //PK, Autoincremental
  costForKm: number,
  costShipping: number,
  postalCode: string // FK, NOT NULL
}