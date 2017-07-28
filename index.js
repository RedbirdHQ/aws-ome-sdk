const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const AWSDynamoDB = AWS.DynamoDB;
const AWSS3 = AWS.S3;

AWS.DynamoDB = function DynamoDB(params = {}) {
  const options = params;

  // connect to local DB if running offline
  if (process.env.IS_OFFLINE) {
    options.region = options.region ? options.region : 'localhost';
    options.endpoint = options.endpoint ? options.endpoint : 'http://localhost:8000';
  }

  const client = new AWSDynamoDB(options);

  return client;
};

AWS.S3 = function S3(params = {}) {
  const options = params;

  // connect to local S3 if running offline
  if (process.env.IS_OFFLINE) {
    options.s3ForcePathStyle = options.s3ForcePathStyle ? options.s3ForcePathStyle : true;
    options.endpoint = options.endpoint ? options.endpoint : new AWS.Endpoint('http://localhost:4569');
  }
  const client = new AWSS3(options);

  return client;
};

module.exports = AWS;
