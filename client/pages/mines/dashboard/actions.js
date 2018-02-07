'use strict';
const ApiActions = require('../../../actions/api');
const Constants = require('./constants');
const Store = require('./store');


class Actions {
    static getDetails() {

        ApiActions.get(
            '/api/accounts/my',
            undefined,
            Store,
            Constants.GET_DETAILS,
            Constants.GET_DETAILS_RESPONSE
        );
    }

    static getActivities() {

        ApiActions.get(
            '/api/activities/my',
            undefined,
            Store,
            Constants.GET_ACTIVITIES,
            Constants.GET_ACTIVITIES_RESPONSE
        );
    }

    static saveNewActivity(data) {

        ApiActions.post(
            '/api/activities',
            data,
            Store,
            Constants.SAVE_NEW_ACTIVITY,
            Constants.SAVE_NEW_ACTIVITY_RESPONSE
        );
    }

    static updateActivity(data) {
        ApiActions.put(
            '/api/activities/'+data._id,
            data,
            Store,
            Constants.UPDATE_ACTIVITY,
            Constants.UPDATE_ACTIVITY_RESPONSE
        );
    }

    static saveDaily(data) {
      ApiActions.post(
        '/api/dailies',
        data,
        Store,
        Constants.SAVE_DAILY,
        Constants.SAVE_DAILY_RESPONSE
      )
    }

    static saveDetails(data) {

        ApiActions.put(
            '/api/accounts/my',
            data,
            Store,
            Constants.SAVE_DETAILS,
            Constants.SAVE_DETAILS_RESPONSE
        );
    }

    static hideDetailsSaveSuccess() {

        Store.dispatch({
            type: Constants.HIDE_DETAILS_SAVE_SUCCESS
        });
    }

    static getUser() {

        ApiActions.get(
            '/api/users/my',
            undefined,
            Store,
            Constants.GET_USER,
            Constants.GET_USER_RESPONSE
        );
    }

    static saveUser(data) {

        ApiActions.put(
            '/api/users/my',
            data,
            Store,
            Constants.SAVE_USER,
            Constants.SAVE_USER_RESPONSE
        );
    }

    static hideUserSaveSuccess() {

        Store.dispatch({
            type: Constants.HIDE_USER_SAVE_SUCCESS
        });
    }

    static savePassword(data) {

        if (data.password !== data.passwordConfirm) {
            return Store.dispatch({
                type: Constants.SAVE_PASSWORD_RESPONSE,
                err: new Error('password mismatch'),
                response: {
                    message: 'Passwords do not match.'
                }
            });
        }

        delete data.passwordConfirm;

        ApiActions.put(
            '/api/users/my/password',
            data,
            Store,
            Constants.SAVE_PASSWORD,
            Constants.SAVE_PASSWORD_RESPONSE
        );
    }

    static hidePasswordSaveSuccess() {

        Store.dispatch({
            type: Constants.HIDE_PASSWORD_SAVE_SUCCESS
        });
    }
}


module.exports = Actions;
