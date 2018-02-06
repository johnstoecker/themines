'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');

class Task extends MongoModels {}


Task.schema = Joi.object({
    _id: Joi.string().required(),
    text: Joi.string().required(),
    user_id: Joi.string().required(),
    activity_id: Joi.string().required(),
    username: Joi.string().required(),
    timeCreated: Joi.date().required(),
    is_current: Joi.boolean().required()
});


Task.collection = 'tasks';

Task.indexes = [
  { key: { activity_id: 1 } },
  { key: { username: 1} }
];

module.exports = Task;
