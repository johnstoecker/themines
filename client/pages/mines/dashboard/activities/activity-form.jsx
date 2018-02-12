'use strict';
const Actions = require('../actions');
const Alert = require('../../../../components/alert.jsx');
const Button = require('../../../../components/form/button.jsx');
const ControlGroup = require('../../../../components/form/control-group.jsx');
const LinkState = require('../../../../helpers/link-state');
const PropTypes = require('prop-types');
const React = require('react');
const Spinner = require('../../../../components/form/spinner.jsx');
const TextControl = require('../../../../components/form/text-control.jsx');
const Lodash = require('lodash')


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

    handleTaskDelete(taskIndex) {
      var newTasks = this.state.tasks
      newTasks = newTasks.slice(0, taskIndex).concat(newTasks.slice(taskIndex+1, newTasks.length))
      this.setState({tasks: newTasks})
    }

    handleTaskChange(taskIndex, event) {
      event.preventDefault()
      event.stopPropagation()
      console.log(event.target.value)
      console.log(taskIndex)
      var newTasks = this.state.tasks
      newTasks[taskIndex].text = event.target.value
      this.setState({tasks: newTasks})
    }

    handleDoneChange(isGoing, taskIndex, event) {
      console.log(event.target.checked)
      var newTasks = this.state.tasks

      newTasks[taskIndex].isGoing = event.target.checked
      this.setState({tasks: newTasks})
      Actions.saveDaily({date: new Date(), is_complete: this.isComplete()})
    }

    isComplete() {
      console.log(this.state.tasks)
        !!(_.every(this.state.tasks, 'isGoing'))
    }

    handleAddTask() {
      this.setState({
        tasks: this.state.tasks.concat({})
      })
    }

    handleEditSubmit(event) {
        console.log(this.state)
        event.preventDefault();
        event.stopPropagation();
        this.stopEditing()
        Actions.updateActivity({
            _id: this.state._id,
            text: this.state.text,
            tasks: this.state.tasks,
        });
        console.log(this.state)
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


        const editingTasks = (this.state.tasks && this.state.tasks.map((task, taskIndex) => {
            var taskText = task.text;
            return (
                <div key={taskIndex}>
                  <TextControl
                      name="task.text"
                      placeholder="Measures 30-38 slowly"
                      value={task.text}
                      onChange={this.handleTaskChange.bind(this, taskIndex)}
                      disabled={this.props.loading}
                  />
                <div className="fa fa-trash" onClick={this.handleTaskDelete.bind(this, taskIndex)}/>
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


        const currentTasks = (this.state.tasks && this.state.tasks.map((task, taskIndex) => {
            return (
                <div key={Math.random()}>
                  <input
                              name="complete"
                              type="checkbox"
                              checked={task.isGoing}
                              onChange={this.handleDoneChange.bind(this, task.isGoing, taskIndex)} />
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

        return (<div >
          {editingForm}
          {doneForm}
        </div>
        );
    }
}

ActivityForm.propTypes = propTypes;


module.exports = ActivityForm;
