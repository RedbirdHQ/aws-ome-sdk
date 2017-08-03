# AWS-OME-SDK

Using this package with [Serverless Framework](https://serverless.com/) and offline/local extensions:
- [serverless-offline](https://github.com/dherault/serverless-offline)
- [serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
- [serverless-s3-local](https://github.com/ar90n/serverless-s3-local)

/!\ All plugins should be installed /!\

## How to install

Install all required serverless plugins.

Then install `aws-ome-sdk`:

```sh
$ npm install --save aws-ome-sdk
```

## How to use

Use like [aws-sdk](https://github.com/aws/aws-sdk-js).

```javascript
const AWS = require('aws-ome-sdk');

const ddb = AWS.DynamoDB();
const ddbDoc = AWS.DynamoDB.DocumentClient();
const s3 = AWS.S3();
```

## How to test

```sh
$ npm run test
$ npm run lint
```

## TODO

- More tests
- Using `serverless.yml` variables to configure services (host/port)
- Integration with other services that needs local configuration
