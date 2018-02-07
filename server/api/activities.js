'use strict';
const AuthPlugin = require('../auth');
const Boom = require('boom');
const EscapeRegExp = require('escape-string-regexp');
const Joi = require('joi');
const Mongodb = require('mongodb')

const internals = {};


internals.applyRoutes = function (server, next) {

    const Activity = server.plugins['hapi-mongo-models'].Activity;


    server.route({
        method: 'GET',
        path: '/activities',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            validate: {
                query: {
                    name: Joi.string().allow(''),
                    pivot: Joi.string().allow(''),
                    fields: Joi.string(),
                    sort: Joi.string().default('_id'),
                    limit: Joi.number().default(20),
                    page: Joi.number().default(1)
                }
            }
        },
        handler: function (request, reply) {

            const query = {};
            if (request.query.pivot) {
                query.pivot = new RegExp('^.*?' + EscapeRegExp(request.query.pivot) + '.*$', 'i');
            }
            if (request.query.name) {
                query.name = new RegExp('^.*?' + EscapeRegExp(request.query.name) + '.*$', 'i');
            }
            const fields = request.query.fields;
            const sort = request.query.sort;
            const limit = request.query.limit;
            const page = request.query.page;

            Activity.pagedFind(query, fields, sort, limit, page, (err, results) => {

                if (err) {
                    return reply(err);
                }

                reply(results);
            });
        }
    });


    server.route({
        method: 'GET',
        path: '/activities/my',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {
            const user_id = request.auth.credentials.user._id.toString();
            // console.log(id);

            Activity.find({user_id: user_id}, (err, predictions) => {

                if (err) {
                    return reply(err);
                }

                if (!predictions) {
                    return reply(Boom.notFound());
                }

                reply(predictions);
            });
        }
    });


    server.route({
        method: 'GET',
        path: '/activities/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root')
            ]
        },
        handler: function (request, reply) {

            Activity.findById(request.params.id, (err, status) => {

                if (err) {
                    return reply(err);
                }

                if (!status) {
                    return reply(Boom.notFound('Document not found.'));
                }

                reply(status);
            });
        }
    });


    server.route({
        method: 'POST',
        path: '/activities',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            },
            validate: {
                payload: {
                    text: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {
            const user_id = request.auth.credentials.user._id.toString();
            const username = request.auth.credentials.user.username.toString();
            const text = request.payload.text;

            // Activity.create
            Activity.insertOne({text: text, user_id: user_id, username: username, tasks: [], is_current: true }, (err, status) => {

                if (err) {
                    return reply(err);
                }

                reply(status);
            });
        }
    });


    server.route({
        method: 'PUT',
        path: '/activities/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {
          // TODO: on update of activity with dailies, copy over + create new one, set old one as not current
          const user_id = request.auth.credentials.user._id.toString();
          const username = request.auth.credentials.user.username.toString();
          const text = request.payload.text;

            const id = Mongodb.ObjectId(request.params.id);
            const update = {
                $set: {
                    text: request.payload.text,
                    tasks: request.payload.tasks
                }
            };

            Activity.findOneAndUpdate({_id: id, user_id: user_id}, update, (err, status) => {

                if (err) {
                    return reply(err);
                }

                if (!status) {
                    return reply(Boom.notFound('Document not found.'));
                }

                reply(status);
            });
        }
    });


    server.route({
        method: 'DELETE',
        path: '/activities/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root')
            ]
        },
        handler: function (request, reply) {

            Activity.findByIdAndDelete(request.params.id, (err, status) => {

                if (err) {
                    return reply(err);
                }

                if (!status) {
                    return reply(Boom.notFound('Document not found.'));
                }

                reply({ success: true });
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
    name: 'activities'
};
