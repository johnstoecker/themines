'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');

class DailyActivity extends MongoModels {}


DailyActivity.schema = Joi.object({
    _id: Joi.string().required(),
    text: Joi.string().required(),
    user_id: Joi.string().required(),
    activity_id: Joi.string().required(),
    username: Joi.string().required(),
    timeCreated: Joi.date().required(),
    complete: Joi.boolean().required()
});


DailyActivity.collection = 'daily_activities';

DailyActivity.indexes = [
  { key: { user_id: 1 } },
  { key: { username: 1} },
  { key: { activity_id: 1} }
];

module.exports = DailyActivity;
