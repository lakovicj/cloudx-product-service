import { getProductList } from "../handler";
import products from "@mocks/products.json";
import productService from "@service/index";

describe("lambda handler - getProductById", () => {
  it("should return a list of products", async () => {
    const productList = await getProductList(undefined, null, null);

    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify(products),
    };

    expect(productList).toMatchObject(expectedResult);
  });

  it("should return server error", async () => {
    const error: Error = new Error("Server error");

    jest.spyOn(productService, "getProducts").mockImplementation(() => {
      throw error;
    });

    const productWithErrorResponse = await getProductList(
      undefined,
      null,
      null
    );

    const expectedResult = {
      statusCode: 500,
      body: JSON.stringify(error),
    };

    expect(productWithErrorResponse).toMatchObject(expectedResult);
  });
});
