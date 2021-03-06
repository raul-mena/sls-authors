  
'use strict';

const uuid = require('uuid');
const dynamoDb = require('../dynamoDB');

module.exports.create =  (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'Authors',
    Item: {
      id: uuid.v1(),
      name: data.name,
      email: data.email,
      birthday: data.birthday
    }
  };

  dynamoDb.put(params, (error) => {
   // handle potential errors
   if (error) {
    console.error(error);
    callback(null, {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the todo item.',
    });
    return;
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
  callback(null, response);
  });
};
