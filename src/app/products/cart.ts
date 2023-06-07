import { Product } from "./products";

export interface Cart {
  products: Product[];
  size: number;
  price: number;
}
