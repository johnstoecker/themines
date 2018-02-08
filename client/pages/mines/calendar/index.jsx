'use strict';
const Actions = require('./actions');
const React = require('react');
const Store = require('./store');


class CalendarPage extends React.Component {
    constructor(props) {

        super(props);


        this.state = Store.getState();
    }

    componentDidMount() {
        // Actions.getActivities();
        // Actions.getUser();

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {

        this.setState(Store.getState());
    }

    render() {
      // http://bl.ocks.org/KathyZ/c2d4694c953419e0509b
        return (
            <section className="container">
              Calendar here
            </section>
        );
    }
}


module.exports = CalendarPage;
