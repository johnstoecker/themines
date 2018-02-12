'use strict';
const NewActivityForm = require('./activities/new-activity-form.jsx');
const ActivityList = require('./activities/activity-list.jsx');
const Actions = require('./actions');
// const PasswordForm = require('./password-form.jsx');
const React = require('react');
const Store = require('./store');
// const UserForm = require('./user-form.jsx');


class DashboardPage extends React.Component {
    constructor(props) {

        super(props);


        this.state = Store.getState();
    }

    componentDidMount() {
        Actions.getActivities();
        Actions.getUser();

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {

        this.setState(Store.getState());
    }

    render() {
        return (
            <section className="container">
                <ActivityList {...this.state.activities} />
            </section>
        );
    }
}


module.exports = DashboardPage;
