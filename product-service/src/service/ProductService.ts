import { Product, Products } from "src/model/product";
import productsRepository from "src/repository/products-repository";

export default class ProductService {
  async getProducts(): Promise<Products> {
    const products: Products = await productsRepository.getAllProducts();
    return products;
  }

  async getProductById(id: string): Promise<Product> {
    const product: Product = await productsRepository.getProductById(id);
    return product;
  }

  async createProduct(productData: Omit<Product, "id">): Promise<string> {
    const newProductId: string = await productsRepository.saveProduct(
      productData
    );
    return newProductId;
  }
}
