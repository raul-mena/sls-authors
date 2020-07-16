'use strict';

const dynamodb = require('../dynamodb');

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: 'Authors',
    // ProjectionExpression:'Name',

    ProjectionExpression: "email, id, #y, birthday",
    ExpressionAttributeNames: {"#y": "name"}
    // KeyConditionExpression: "#id != :id",
    // ExpressionAttributeNames:{
    //     "#id": "id"
    // },
    // ExpressionAttributeValues: {
    //     ":id": 'dec8c6d0-65ca-11e9-a69e-5ffdbf591639'
    // }
  };

  // fetch all todos from the database
  dynamodb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};