'use strict';
const AuthPlugin = require('../auth');
const Boom = require('boom');
const EscapeRegExp = require('escape-string-regexp');
const Joi = require('joi');
const Mongodb = require('mongodb')

const internals = {};


internals.applyRoutes = function (server, next) {

    const Daily = server.plugins['hapi-mongo-models'].Daily;


    server.route({
        method: 'GET',
        path: '/dailies/my',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {
            const user_id = request.auth.credentials.user._id.toString();
            // console.log(id);

            Daily.find({user_id: user_id}, (err, dailies) => {

                if (err) {
                    return reply(err);
                }

                if (!dailies) {
                    return reply(Boom.notFound());
                }

                reply(dailies);
            });
        }
    });


    server.route({
        method: 'POST',
        path: '/dailies',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {
            const user_id = request.auth.credentials.user._id.toString();
            const date = request.payload.date;
            const is_complete = request.payload.is_complete;
            // static create(user_id, user_time, is_complete, callback) {

            Daily.create(user_id, date, is_complete, (err, daily) => {

                if (err) {
                    return reply(err);
                }

                reply(daily);
            });
        }
    });


    next();
};


exports.register = function (server, options, next) {

    server.dependency(['auth', 'hapi-mongo-models'], internals.applyRoutes);

    next();
};


exports.register.attributes = {
    name: 'dailies'
};
