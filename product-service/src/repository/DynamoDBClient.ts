import AWS from "aws-sdk";

type ConfigOptionsType = AWS.DynamoDB.DocumentClient.DocumentClientOptions &
  AWS.DynamoDB.Types.ClientConfiguration;

const dynamoOfflineConfig: ConfigOptionsType = {
  endpoint: process.env.DYNAMO_DB_ENDPOINT_URL,
  region: process.env.DEFAULT_REGION,
};

const dynamoDBClient: AWS.DynamoDB.DocumentClient = process.env.IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient(dynamoOfflineConfig)
  : new AWS.DynamoDB.DocumentClient();
export default dynamoDBClient;
