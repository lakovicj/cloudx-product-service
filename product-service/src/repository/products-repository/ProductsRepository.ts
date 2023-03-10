import dynamoDBClient from "../DynamoDBClient";
import AWS from "aws-sdk";
import { Product, Products, Stock, Stocks } from "src/model/product";
import { randomUUID } from "crypto";

export default class ProductsRepository {
  private client: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.client = dynamoDBClient;
  }

  getAllProducts = async (): Promise<Products> => {
    const productsResult = this.client
      .scan({ TableName: process.env.PRODUCTS_TABLE_NAME })
      .promise();
    const stocksResult = this.client
      .scan({ TableName: process.env.STOCKS_TABLE_NAME })
      .promise();

    const products: Products = (await productsResult).Items as Products;
    const stocks: Stocks = (await stocksResult).Items as Stocks;

    return products.map((product: Product) => ({
      ...product,
      count: stocks.find((stock: Stock) => stock.product_id === product.id)
        ?.count,
    }));
  };

  getProductById = async (productId: string): Promise<Product> => {
    const productResult = this.client
      .get({
        TableName: process.env.PRODUCTS_TABLE_NAME,
        Key: { id: productId },
      })
      .promise();
    const stockResult = this.client
      .get({
        TableName: process.env.STOCKS_TABLE_NAME,
        Key: { product_id: productId },
      })
      .promise();

    const product: Product = (await productResult).Item as Product;
    const stock: Stock = (await stockResult).Item as Stock;

    return {
      ...product,
      count: stock.count,
    };
  };

  saveProduct = async (productData: Omit<Product, "id">): Promise<string> => {
    const uuid: string = randomUUID();

    await this.client
      .batchWrite({
        RequestItems: {
          [process.env.PRODUCTS_TABLE_NAME]: [
            {
              PutRequest: {
                Item: {
                  id: uuid,
                  title: productData.title,
                  description: productData.description,
                  price: productData.price,
                },
              },
            },
          ],
          [process.env.STOCKS_TABLE_NAME]: [
            {
              PutRequest: {
                Item: {
                  product_id: uuid,
                  count: productData.count,
                },
              },
            },
          ],
        },
      })
      .promise();

    return uuid;
  };
}
