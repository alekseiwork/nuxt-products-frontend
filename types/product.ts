export interface Product {
  id: number;
  article: string;
  name: string;
  brand?: string;
  price?: number;
  color?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;
