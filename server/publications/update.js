
'use strict';

const dynamodb = require('../dynamodb');

module.exports.update = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'Publications',
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':title': data.title,
      ':body': data.body
    },
    UpdateExpression: 'SET title = :title, body = :body',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamodb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t update the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};