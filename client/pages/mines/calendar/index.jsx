'use strict';
const Actions = require('./actions');
const React = require('react');
const Store = require('./store');
import CalendarHeatmap from 'react-calendar-heatmap';

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

              <CalendarHeatmap
                startDate={new Date('2016-01-01')}
                endDate={new Date('2016-03-01')}
                values={[
                  { date: '2016-01-01', count: 1 },
                  { date: '2016-01-03', count: 4 },
                  { date: '2016-01-06', count: 2 }
                ]}
                classForValue={(value) => {
                  if (!value) {
                    return 'color-empty';
                  }
                  return `color-scale-${value.count}`;
                }}
              />
            </section>
        );
    }
}


module.exports = CalendarPage;
