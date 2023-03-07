import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { HTTP_STATUS_CODES } from "@constants/http-status-codes";
import { Products } from "src/model/product";
import productService from "@service/index";

export const getProductList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  try {
    const products: Products = await productService.getProducts();
    return formatJSONResponse(products, HTTP_STATUS_CODES.OK);
  } catch (e) {
    return formatJSONResponse(e, HTTP_STATUS_CODES.SERVER_ERROR);
  }
};

export const main = middyfy(getProductList);
