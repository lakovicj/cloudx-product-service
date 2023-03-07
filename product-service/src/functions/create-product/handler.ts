import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { HTTP_STATUS_CODES } from "@constants/http-status-codes";
import productService from "@service/index";

export const createProduct: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { description, price, title, count } = event.body;

  try {
    const newProductId: string = await productService.createProduct({
      description,
      price,
      title,
      count,
    });

    return formatJSONResponse({ id: newProductId }, HTTP_STATUS_CODES.OK);
  } catch (e) {
    return formatJSONResponse(e, HTTP_STATUS_CODES.SERVER_ERROR);
  }
};

export const main = middyfy(createProduct);
