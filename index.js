const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const AWSDynamoDB = AWS.DynamoDB;
const AWSS3 = AWS.S3;

const DEFAULT_DYNAMODB_PORT = 8000;
const DEFAULT_S3_PORT = 4569;

AWS.DynamoDB = function DynamoDB(params = {}) {
  const DYNAMODB_PORT = process.env.LOCAL_DYNAMODB_PORT || DEFAULT_DYNAMODB_PORT;
  const options = params;

  // connect to local DB if running offline
  if (process.env.IS_OFFLINE) {
    options.region = options.region || 'localhost';
    options.endpoint = options.endpoint || `http://localhost:${DYNAMODB_PORT}`;
  }

  const client = new AWSDynamoDB(options);

  return client;
};

AWS.DynamoDB.DocumentClient = function DynamoDBDocumentClient(params = {}) {
  const DYNAMODB_PORT = process.env.LOCAL_DYNAMODB_PORT || DEFAULT_DYNAMODB_PORT;
  const options = params;

  // connect to local DB if running offline
  if (process.env.IS_OFFLINE) {
    options.region = options.region || 'localhost';
    options.endpoint = options.endpoint || `http://localhost:${DYNAMODB_PORT}`;
  }

  const client = new AWSDynamoDB.DocumentClient(options);

  return client;
};

AWS.S3 = function S3(params = {}) {
  const S3_PORT = process.env.LOCAL_S3_PORT || DEFAULT_S3_PORT;
  const options = params;

  // connect to local S3 if running offline
  if (process.env.IS_OFFLINE) {
    options.s3ForcePathStyle = options.s3ForcePathStyle || true;
    options.endpoint = options.endpoint || new AWS.Endpoint(`http://localhost:${S3_PORT}`);
  }
  const client = new AWSS3(options);

  return client;
};

module.exports = AWS;
