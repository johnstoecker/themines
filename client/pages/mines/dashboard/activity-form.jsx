'use strict';
const Actions = require('./actions');
const Alert = require('../../../components/alert.jsx');
const Button = require('../../../components/form/button.jsx');
const ControlGroup = require('../../../components/form/control-group.jsx');
const LinkState = require('../../../helpers/link-state');
const PropTypes = require('prop-types');
const React = require('react');
const Spinner = require('../../../components/form/spinner.jsx');
const TextControl = require('../../../components/form/text-control.jsx');


const propTypes = {
    error: PropTypes.string,
    hasError: PropTypes.object,
    help: PropTypes.object,
    hydrated: PropTypes.bool,
    loading: PropTypes.bool,
    showSaveSuccess: PropTypes.bool
};


class ActivityForm extends React.Component {
    constructor(props) {

        super(props);
        console.log(props)
        // props.editing = false
        this.state = props

    }

    componentDidMount() {
        this.setState({editing: false})
    }

    componentWillReceiveProps(nextProps) {

        this.setState(nextProps);
        this.setState({editing: false})
    }

    handleDoneChange(event) {
      Actions.saveDaily({date: new Date(), is_complete: false})
    }

    handleAddTask() {
      this.setState({
        tasks: this.state.tasks.concat({text: "xxx"})
      })
    }

    handleEditSubmit(event) {

        event.preventDefault();
        event.stopPropagation();
        this.stopEditing()
        Actions.updateActivity({
            _id: this.state._id,
            text: this.state.text,
            tasks: this.state.tasks,
        });
    }

    startEditing() {
      this.setState({
        editing: true
      })
    }

    stopEditing() {
      this.setState({
        editing: false
      })
    }


    render() {

        const alerts = [];

        if (this.props.showSaveSuccess) {
            alerts.push(<Alert
                key="success"
                type="success"
                onClose={Actions.hideActivitySaveSuccess}
                message="Success. Changes have been saved."
            />);
        }

        if (this.props.error) {
            alerts.push(<Alert
                key="danger"
                type="danger"
                message={this.props.error}
            />);
        }


        const editingTasks = (this.state.tasks && this.state.tasks.map((task) => {
            return (
                <div key={Math.random()}>
                  <TextControl
                      name="task.text"
                      value={task.text}
                      onChange={LinkState.bind(this)}
                      disabled={this.props.loading}
                  />
                </div>
            )
        })) || []

        const editingForm = (this.state.editing &&
              <form onSubmit={this.handleEditSubmit.bind(this)}>
                <fieldset>
                    {alerts}
                    <TextControl
                        name="text"
                        value={this.state.text}
                        onChange={LinkState.bind(this)}
                        disabled={this.props.loading}
                    />
                  Tasks:
                  {editingTasks}
                  <Button
                      onClick={this.handleAddTask.bind(this)}
                      inputClasses={{ 'btn-primary': true }}
                      disabled={this.props.loading}>

                      Add Task
                      <Spinner
                          space="left"
                          show={this.props.loading}
                      />
                  </Button>
                    <ControlGroup hideLabel={true} hideHelp={true}>
                        <Button
                            type="submit"
                            inputClasses={{ 'btn-primary': true }}
                            disabled={this.props.loading}>

                            Save Activity
                            <Spinner
                                space="left"
                                show={this.props.loading}
                            />
                        </Button>
                    </ControlGroup>
                </fieldset>
            </form>
        )


        const currentTasks = (this.state.tasks && this.state.tasks.map((task) => {
            return (
                <div key={Math.random()}>
                  <input
                              name="complete"
                              type="checkbox"
                              checked={this.state.isGoing}
                              onChange={this.handleDoneChange} />
                            {task.text}
                </div>
            )
        })) || []
        const doneForm = (!this.state.editing &&
              <form onSubmit={this.handleDoneChange.bind(this)}>
                <fieldset>
                  {this.state.text}
                  {currentTasks}
                  <div className="fa fa-edit" onClick={this.startEditing.bind(this)}/>
                </fieldset>
              </form>
        )

        return (<div>
          {editingForm}
          {doneForm}
        </div>
        );
    }
}

ActivityForm.propTypes = propTypes;


module.exports = ActivityForm;
