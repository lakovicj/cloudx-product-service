import { getProductById } from "../handler";
import products from "@mocks/products.json";
import productService from "@service/index";

describe("lambda handler - getProductById", () => {
  it("should return a product", async () => {
    const mockId: string = "1";
    const mockEvent = {
      pathParameters: {
        id: mockId,
      },
    } as any;

    const product = await getProductById(mockEvent, null, null);

    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify(products.find((p) => p.id === mockId)),
    };

    expect(product).toMatchObject(expectedResult);
  });

  it("should return 404 - product not found", async () => {
    const mockId: string = "nonExistingId";
    const mockEvent = {
      pathParameters: {
        id: mockId,
      },
    } as any;

    const product = await getProductById(mockEvent, null, null);

    const expectedResult = {
      statusCode: 404,
      body: JSON.stringify(null),
    };

    expect(product).toMatchObject(expectedResult);
  });

  it("should return 500 - server error", async () => {
    const mockId: string = "2";
    const mockEvent = {
      pathParameters: {
        id: mockId,
      },
    } as any;

    const error: Error = new Error("Server error");

    jest.spyOn(productService, "getProductById").mockImplementation(() => {
      throw error;
    });

    const errorResponse = await getProductById(mockEvent, null, null);

    const expectedResult = {
      statusCode: 500,
      body: JSON.stringify(error),
    };

    expect(errorResponse).toMatchObject(expectedResult);
  });
});
