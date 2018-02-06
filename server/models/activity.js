'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');

class Activity extends MongoModels {}


Activity.schema = Joi.object({
    _id: Joi.string().required(),
    text: Joi.string().required(),
    user_id: Joi.string().required(),
    username: Joi.string().required(),
    timeCreated: Joi.date().required(),
    is_current: Joi.boolean().required()
});


Activity.collection = 'activities';

Activity.indexes = [
  { key: { user_id: 1 } },
  { key: { username: 1} }
];

module.exports = Activity;
