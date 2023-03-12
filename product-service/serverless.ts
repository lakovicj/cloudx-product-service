import type { AWS } from "@serverless/typescript";

import getProductList from "@functions/get-product-list";
import getProductById from "@functions/get-product-by-id";
import createProduct from "@functions/create-product";
import * as dotenv from "dotenv";

dotenv.config();

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  plugins: [
    // auto-swagger plugin should come before any transform plugins (eg. serverless-webpack),
    // and must come before serverless-offline
    "serverless-auto-swagger",
    "serverless-esbuild",
    "serverless-offline",
  ],
  useDotenv: true,
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iam: {
      role: process.env.DYNAMO_FULL_ACCESS_ROLE_ARN,
    },
    httpApi: {
      cors: {
        allowedOrigins: [process.env.FRONTEND_APP_URL],
        allowedMethods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      DEFAULT_REGION: "${env:DEFAULT_REGION}",
      DYNAMO_DB_ENDPOINT_URL: "${env:DYNAMO_DB_ENDPOINT_URL}",
      PRODUCTS_TABLE_NAME: "${env:PRODUCTS_TABLE_NAME}",
      STOCKS_TABLE_NAME: "${env:STOCKS_TABLE_NAME}",
      FRONTEND_APP_URL: "${env:FRONTEND_APP_URL}",
    },
  },
  // import the function via paths
  functions: { getProductList, getProductById, createProduct },
  package: { individually: true },
  custom: {
    autoswagger: {
      title: "Product Service API",
      apiType: "httpApi",
      generateSwaggerOnDeploy: true,
      typefiles: ["./src/model/product.d.ts"],
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
