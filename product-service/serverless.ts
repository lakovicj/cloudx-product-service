import type { AWS } from "@serverless/typescript";

import getMovieList from "@functions/get-movie-list";
import getMovieById from "@functions/get-movie-by-id";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  plugins: [
    "serverless-auto-swagger",
    "serverless-esbuild",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    httpApi: {
      cors: {
        // move to .env
        allowedOrigins: ["https://d16du7jdck2qzk.cloudfront.net"],
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: { getMovieList, getMovieById },
  package: { individually: true },
  custom: {
    autoswagger: {
      title: "Product Service API",
      apiType: "httpApi",
      generateSwaggerOnDeploy: true,
      typefiles: ["./src/model/movie.d.ts"],
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