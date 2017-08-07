const AWS = require('../index.js');
const assert = require('assert');

describe('aws-ome-sdk', () => {
  describe('#online mode', () => {
    before(() => {
      delete process.env.IS_OFFLINE;
    });

    it('should get S3 client without parameters', () => {
      const s3 = AWS.S3();
      assert.equal(s3.config.region, 'us-east-1'); // default region
      assert.equal(s3.endpoint.href, 'https://s3.amazonaws.com/');
    });

    it('should get S3 client with parameters', () => {
      const s3 = AWS.S3({ region: 'us-east-1' });
      assert.equal(s3.config.region, 'us-east-1');
      assert.equal(s3.endpoint.href, 'https://s3.amazonaws.com/');
    });

    it('should get DynamoDB client without parameters', () => {
      const ddb = AWS.DynamoDB();
      assert.equal(ddb.config.region, undefined);
      assert.equal(ddb.endpoint.href, 'https://dynamodb.undefined.amazonaws.com/');
    });

    it('should get DynamoDB client with parameters', () => {
      const ddb = AWS.DynamoDB({ region: 'us-east-1' });
      assert.equal(ddb.config.region, 'us-east-1');
      assert.equal(ddb.endpoint.href, 'https://dynamodb.us-east-1.amazonaws.com/');
    });

    it('should get DynamoDB Document client without parameters', () => {
      const ddb = AWS.DynamoDB.DocumentClient();
      assert.equal(ddb.options.region, undefined);
      assert.equal(ddb.service.endpoint.href, 'https://dynamodb.undefined.amazonaws.com/');
    });

    it('should get DynamoDB Document client with parameters', () => {
      const ddb = AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
      assert.equal(ddb.options.region, 'us-east-1');
      assert.equal(ddb.service.endpoint.href, 'https://dynamodb.us-east-1.amazonaws.com/');
    });
  });

  describe('#offline mode', () => {
    before(() => {
      process.env.IS_OFFLINE = true;
    });

    it('should get S3 client without parameters', () => {
      const s3 = AWS.S3();
      assert.equal(s3.config.region, 'us-east-1'); // default region
      assert.equal(s3.endpoint.href, 'http://localhost:4569/');
    });

    it('should get S3 client with environment variable', () => {
      process.env.LOCAL_S3_PORT = 1351;

      const s3 = AWS.S3();
      assert.equal(s3.config.region, 'us-east-1'); // default region
      assert.equal(s3.endpoint.href, 'http://localhost:1351/');

      delete process.env.LOCAL_S3_PORT;
    });

    it('should get S3 client with parameters', () => {
      const s3 = AWS.S3({ endpoint: new AWS.Endpoint('http://localhost:9000/') });
      assert.equal(s3.config.region, 'us-east-1');
      assert.equal(s3.endpoint.href, 'http://localhost:9000/');
    });

    it('should get DynamoDB client without parameters', () => {
      const ddb = AWS.DynamoDB();
      assert.equal(ddb.config.region, 'localhost');
      assert.equal(ddb.endpoint.href, 'http://localhost:8000/');
    });

    it('should get DynamoDB client with environment variable', () => {
      process.env.LOCAL_DYNAMODB_PORT = 1351;

      const ddb = AWS.DynamoDB();
      assert.equal(ddb.config.region, 'localhost');
      assert.equal(ddb.endpoint.href, 'http://localhost:1351/');

      delete process.env.LOCAL_DYNAMODB_PORT;
    });

    it('should get DynamoDB client with parameters', () => {
      const ddb = AWS.DynamoDB({ region: 'localregion' });
      assert.equal(ddb.config.region, 'localregion');
      assert.equal(ddb.endpoint.href, 'http://localhost:8000/');
    });

    it('should get DynamoDB Document client without parameters', () => {
      const ddb = AWS.DynamoDB.DocumentClient();
      assert.equal(ddb.options.region, 'localhost');
      assert.equal(ddb.service.endpoint.href, 'http://localhost:8000/');
    });

    it('should get DynamoDB Document client with environment variable', () => {
      process.env.LOCAL_DYNAMODB_PORT = 1351;

      const ddb = AWS.DynamoDB.DocumentClient();
      assert.equal(ddb.options.region, 'localhost');
      assert.equal(ddb.service.endpoint.href, 'http://localhost:1351/');

      delete process.env.LOCAL_DYNAMODB_PORT;
    });

    it('should get DynamoDB Document client with parameters', () => {
      const ddb = AWS.DynamoDB.DocumentClient({ region: 'localregion' });
      assert.equal(ddb.options.region, 'localregion');
      assert.equal(ddb.service.endpoint.href, 'http://localhost:8000/');
    });
  });

  after(() => {
    delete process.env.IS_OFFLINE;
  });
});
