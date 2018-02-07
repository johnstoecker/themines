'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');

class Task extends MongoModels {}


Task.schema = Joi.object({
    _id: Joi.string().required(),
    text: Joi.string().required(),
    frequency: Joi.string().required()
});


// Task.collection = 'tasks';
//
// Task.indexes = [
//   { key: { activity_id: 1 } },
//   { key: { username: 1} }
// ];

module.exports = Task;
