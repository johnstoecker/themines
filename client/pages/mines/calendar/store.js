'use strict';
const Dailies = require('./reducers/dailies')
const Redux = require('redux');

module.exports = Redux.createStore(
    Redux.combineReducers({
        dailies: Dailies
    })
);
