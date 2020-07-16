'use strict';

const dynamodb = require('../dynamodb');

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: 'Publications',
    FilterExpression: "#idAuthor = :idAuthor",
    ExpressionAttributeNames:{
        "#idAuthor": "idAuthor"
    },
    ExpressionAttributeValues: {
        ":idAuthor": event.pathParameters.id
    }
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
      body: JSON.stringify(result),
    };
    callback(null, response);
  });
};