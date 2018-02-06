'use strict';
const Constants = require('../constants');
const ObjectAssign = require('object-assign');
const ParseValidation = require('../../../../helpers/parse-validation');


const initialState = {
    hydrated: false,
    loading: false,
    showSaveSuccess: false,
    error: undefined,
    hasError: {},
    help: {},
    data: []
};
const reducer = function (state = initialState, action) {

    if (action.type === Constants.GET_ACTIVITIES) {
        return ObjectAssign({}, state, {
            loading: true,
            hydrated: false
        });
    }

    if (action.type === Constants.GET_ACTIVITIES_RESPONSE) {
        const validation = ParseValidation(action.response);
        console.log(action.response)
        return ObjectAssign({}, state, {
            loading: false,
            hydrated: true,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help,
            data: action.response
        });
    }

    if (action.type === Constants.SAVE_NEW_ACTIVITY) {
        return ObjectAssign({}, state, {
            loading: true,
            name: action.request.data.name
        });
        // return Object.assign({}, state, {
        //     hydrated: true,
        //     loading: false,
        //     pages: action.response.pages,
        //     items: action.response.items,
        //     data: state.data
        //         .concat([action.response])
        // })

    }

    if (action.type === Constants.SAVE_NEW_ACTIVITY_RESPONSE) {

        return Object.assign({}, state, {
            hydrated: true,
            loading: false,
            pages: action.response.pages,
            items: action.response.items,
            data: state.data
                .concat([action.response[[0]]])
        })

        // const validation = ParseValidation(action.response);
        // const stateUpdates = {
        //     loading: false,
        //     showSaveSuccess: !action.err,
        //     error: validation.error,
        //     hasError: validation.hasError,
        //     help: validation.help
        // };
        //
        // if (action.response.hasOwnProperty('name')) {
        //     stateUpdates.name = action.response.name;
        // }
        //
        // return ObjectAssign({}, state, stateUpdates);
    }

    if (action.type === Constants.HIDE_ACTIVITIES_SAVE_SUCCESS) {
        return ObjectAssign({}, state, {
            showSaveSuccess: false
        });
    }

    return state;
};


module.exports = reducer;
