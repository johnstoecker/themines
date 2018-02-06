'use strict';
const NewActivityForm = require('./new-activity-form.jsx');
const ActivityForm = require('./activity-form.jsx');
const Actions = require('./actions');
// const PasswordForm = require('./password-form.jsx');
const React = require('react');
const Store = require('./store');
// const UserForm = require('./user-form.jsx');


class ActivityList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { activities: props}
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.hydrated) {
        this.setState({
          activities: nextProps
        });
      }
    }

    componentDidMount() {
        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {

        this.setState(Store.getState());
    }

    render() {
      const activities = (this.state.activities.hydrated && this.state.activities.data.map((activity) => {
          return (
              <ActivityForm {...activity} />
          )
      })) || []

        return (
            <section className="container">
                <h1 className="page-header">Today's Activities</h1>
                <div className="row">
                    <div className="col-sm-6">
                      {activities}
                      <NewActivityForm {...this.state.activities} />
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = ActivityList;
