'use strict';
const Joi = require('joi');
const Async = require('async');
const MongoModels = require('mongo-models');
const Mongodb = require('mongodb')

class Daily extends MongoModels {
  static create(user_id, user_time, is_complete, callback) {
      const self = this;
      // we only care about the date --
      // convert the given FE time -> date -> UTC date
      // TODO: wtf
      // console.log(Date.UTC((new Date(user_time)).toDateString()))
      // TODO: make this into UTC
      var user_date = new Date((new Date(user_time)).toDateString())
      Async.auto({
          findMatchingDate: function(done) {
            Daily.findOne({user_id: user_id, date: user_date}, done)
          },
          newDaily: ['findMatchingDate', function (results, done) {
              if (results.findMatchingDate) {
                console.log('updating old daily')
                const update = {
                  $set:{
                    is_complete: is_complete
                  }
                }
                console.log(results.findMatchingDate._id)
                self.findByIdAndUpdate(results.findMatchingDate._id, update, done)
              }
              else {
                console.log('creating new daily')
                const document = {
                    user_id: user_id,
                    date: user_date,
                    is_complete: is_complete,
                    created: new Date()
                };

                // TODO: if we had a result, updated
                // otherwise create new
                self.insertOne(document, done);
              }
          }]
      }, (err, results) => {
          console.log(results)
          if (err) {
              return callback(err);
          }

          callback(null, results.newDaily[0]);
      });
  }}


Daily.schema = Joi.object({
    _id: Joi.string().required(),
    user_id: Joi.string().required(),
    // TODO: allow users to save where they are and switch devices
    // activities: Joi.array().items(Joi.object(
    //   { activity_id: Joi.string().required(),
    //     tasks_complete: Joi.integer().required,
    //     is_complete: Joi.boolean().required
    //   })),
    created: Joi.date().required(),
    date: Joi.date().required(),
    is_complete: Joi.boolean().required()
});


Daily.collection = 'dailies';

Daily.indexes = [
  { key: { user_id: 1 } },
  { key: { date: 1} }
];

module.exports = Daily;
