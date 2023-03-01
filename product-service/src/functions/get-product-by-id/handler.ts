import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { HTTP_STATUS_CODES } from "@constants/http-status-codes";
import { Product } from "../../model/product";
import productService from "@service/index";

export const getProductById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { id: productId } = event.pathParameters;
  try {
    const product: Product = await productService.getProductById(productId);
    if (product) {
      return formatJSONResponse(product, HTTP_STATUS_CODES.OK);
    }
    return formatJSONResponse(null, HTTP_STATUS_CODES.NOT_FOUND);
  } catch (e) {
    return formatJSONResponse(e, HTTP_STATUS_CODES.SERVER_ERROR);
  }
};

export const main = middyfy(getProductById);
