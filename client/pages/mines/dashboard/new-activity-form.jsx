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
    name: PropTypes.shape({
        first: PropTypes.string,
        middle: PropTypes.string,
        last: PropTypes.string
    }),
    showSaveSuccess: PropTypes.bool
};


class NewActivityForm extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            text: props.text
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            text: nextProps.text
        });
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();
        console.log(this.state)

        Actions.saveNewActivity({
            text: this.state.text
        });
    }

    render() {

        if (!this.props.hydrated) {
            return (
                <div className="alert alert-info">
                    Loading contact info data...
                </div>
            );
        }

        const alerts = [];

        if (this.props.showSaveSuccess) {
            alerts.push(<Alert
                key="success"
                type="success"
                onClose={Actions.hideNewActivitySaveSuccess}
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

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <legend>New Activity</legend>
                    {alerts}
                    <TextControl
                        name="text"
                        placeholder="e.g. Sonata Pathetique or Music Theory"
                        value={this.state.text}
                        onChange={LinkState.bind(this)}
                        hasError={this.props.hasError['text']}
                        help={this.props.help['text']}
                        disabled={this.props.loading}
                    />
                    <ControlGroup hideLabel={true} hideHelp={true}>
                        <Button
                            type="submit"
                            inputClasses={{ 'btn-primary': true }}
                            disabled={this.props.loading}>

                            Create New Activity
                            <Spinner
                                space="left"
                                show={this.props.loading}
                            />
                        </Button>
                    </ControlGroup>
                </fieldset>
            </form>
        );
    }
}

NewActivityForm.propTypes = propTypes;


module.exports = NewActivityForm;
