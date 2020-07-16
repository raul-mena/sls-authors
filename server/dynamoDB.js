
'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

let options = {
    region: 'localhost',
    endpoint: 'http://localhost:8002',
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;