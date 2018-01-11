# AWS-OME-SDK

## WARNING: this project as been deprecated

This repository/package will no longer be maintained. We advice you to swith to standard [`aws-sdk`](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html) configuation.

Simpler and more reliable sample here: https://gist.github.com/ChristopheBougere/4fe9af102063607077990c7403fc1309

## Description

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

You can define local ports by setting these environment variables:
```sh
export LOCAL_DYNAMODB_PORT=8000;
export LOCAL_S3_PORT=4569;
```
or in Node.js:
```javascript
process.env.LOCAL_DYNAMODB_PORT = 8000;
process.env.LOCAL_S3_PORT = 4569;
```

## How to test

```sh
$ npm run test
$ npm run lint
```

## TODO

- More tests
