const AWS = require('../index.js');
const assert = require('assert');

describe('aws-ome-sdk', () => {
  describe('#online mode', () => {
    before(() => {
      delete process.env.IS_OFFLINE;
    });

    it('should get S3 client without parameters', (done) => {
      const s3 = AWS.S3();
      assert.equal(s3.config.region, 'us-east-1'); // default region
      assert.equal(s3.endpoint.href, 'https://s3.amazonaws.com/');

      done();
    });

    it('should get S3 client with parameters', (done) => {
      const s3 = AWS.S3({ region: 'us-east-1' });
      assert.equal(s3.config.region, 'us-east-1');
      assert.equal(s3.endpoint.href, 'https://s3.amazonaws.com/');

      done();
    });

    it('should get DynamoDB client without parameters', (done) => {
      const ddb = AWS.DynamoDB();
      assert.equal(ddb.config.region, undefined);
      assert.equal(ddb.endpoint.href, 'https://dynamodb.undefined.amazonaws.com/');

      done();
    });

    it('should get DynamoDB client with parameters', (done) => {
      const ddb = AWS.DynamoDB({ region: 'us-east-1' });
      assert.equal(ddb.config.region, 'us-east-1');
      assert.equal(ddb.endpoint.href, 'https://dynamodb.us-east-1.amazonaws.com/');

      done();
    });
  });

  describe('#offline mode', () => {
    before(() => {
      process.env.IS_OFFLINE = true;
    });

    it('should get S3 client without parameters', (done) => {
      const s3 = AWS.S3();
      assert.equal(s3.config.region, 'us-east-1'); // default region
      assert.equal(s3.endpoint.href, 'http://localhost:4569/');

      done();
    });

    it('should get S3 client with parameters', (done) => {
      const s3 = AWS.S3({ endpoint: new AWS.Endpoint('http://localhost:9000/') });
      assert.equal(s3.config.region, 'us-east-1');
      assert.equal(s3.endpoint.href, 'http://localhost:9000/');

      done();
    });

    it('should get DynamoDB client without parameters', (done) => {
      const ddb = AWS.DynamoDB();
      assert.equal(ddb.config.region, 'localhost');
      assert.equal(ddb.endpoint.href, 'http://localhost:8000/');

      done();
    });

    it('should get DynamoDB client with parameters', (done) => {
      const ddb = AWS.DynamoDB({ region: 'localregion' });
      assert.equal(ddb.config.region, 'localregion');
      assert.equal(ddb.endpoint.href, 'http://localhost:8000/');

      done();
    });
  });

  after(() => {
    delete process.env.IS_OFFLINE;
  });
});
