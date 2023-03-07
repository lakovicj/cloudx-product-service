import { Product, Products } from "src/model/product";
import products from "@mocks/products.json";

export default class ProductService {
  constructor() {}

  async getProducts(): Promise<Products> {
    return new Promise<Products>((resolve) => {
      resolve(products);
    });
  }

  async getProductById(id: string): Promise<Product> {
    return new Promise<Product>((resolve) => {
      resolve(products.find((product: Product) => product.id === id));
    });
  }
}
