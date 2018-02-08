'use strict';
const ApiActions = require('../../../actions/api');
const Constants = require('./constants');
const Store = require('./store');


class Actions {
    static getDailies() {

        ApiActions.get(
            '/api/dailies',
            undefined,
            Store,
            Constants.GET_DAILIES,
            Constants.GET_DAILIES_RESPONSE
        );
    }

}


module.exports = Actions;
