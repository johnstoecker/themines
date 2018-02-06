'use strict';
const Activities = require('./reducers/activities')
const Redux = require('redux');
const User = require('./reducers/user');


module.exports = Redux.createStore(
    Redux.combineReducers({
        activities: Activities,
        user: User
    })
);
