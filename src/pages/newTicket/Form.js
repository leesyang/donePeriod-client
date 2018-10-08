import React from 'react';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { connect } from 'react-redux';

// ----- consts -----
import { ticketOpt } from '../../components/forms/Consts';

// ----- validators -----
import {required, nonEmpty } from '../../utils/validators';

// ----- components -----
import Input from '../../components/forms/Input';
import DropDown from '../../components/forms/Dropdown';
import UserSelect from '../../components/forms/UserSelect';
import InputWorkLog from '../../pages/ticket/activity/workLog/InputWorkLog';
import InputTextArea from '../../components/forms/InputTextArea'

// ----- actions -----
import { postNewTicket } from '../../modules/ticketsData';

// ----- css -----
import './Form.css';

export class NewTicket extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(formValues) {
        const { dispatch, reset } = this.props;
        const formData = new FormData();
        Object.keys(formValues).filter(word => !(word === 'newTicketFiles'))
        .forEach(key => formData.append(`${key}`, formValues[key]))

        if(formValues.newTicketFiles.length) {
            for (let i = 0; i < formValues.newTicketFiles.length; i++) {
                formData.append(`files`, formValues.newTicketFiles.item(i))
            }
        }

        return dispatch(postNewTicket(formData))
        .then(() => reset('newTicket'))
    }

    onClickAssign() {
        const { change } = this.props;
        change('assignee', '');
    }
    
    render() {
        const { handleSubmit,
            pristine,
            submitting,
            invalid,
            reset,
            users,
            change,
            assignee,
            currentAssignee } = this.props

        const userSearch = (
            <Field
                component={UserSelect}
                type="text"
                name="userSelect"
                id="userSelect"
                label="Assign to"
                users={users}
                change={change}
                validate={[required, nonEmpty]}
                disabled={pristine || submitting}
            />
        )

        return (
            <form
                className="new-ticket-form"
                onSubmit={handleSubmit(values => this.onSubmit(values))}
                >
                <div className="row">
                    <div className="col-6">
                        <Field
                            component={DropDown}
                            type="text"
                            name="type"
                            id="type"
                            label="Type"
                            options={ticketOpt.type}
                            validate={[required, nonEmpty]}
                            disabled={pristine || submitting}
                        />
                    </div>
                    <div className="col-6">
                        <Field
                            component={DropDown}
                            type="text"
                            name="priority"
                            id="priority"
                            label="Priority"
                            options={ticketOpt.priority}
                            validate={[required, nonEmpty]}
                            disabled={pristine || submitting}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {!assignee? userSearch : (<button className="user-selected" onClick={() => this.onClickAssign()}>{currentAssignee}</button>) }
                        <Field
                            component='input'
                            type="hidden"
                            name="assignee"
                            id="assignee"
                        />
                    </div>
                    <div className="col-6">
                        <Field
                            component={Input}
                            type="date"
                            name="dueDate"
                            id="dueDate"
                            label="Due Date"
                            validate={[required, nonEmpty]}
                            disabled={pristine || submitting}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                    <Field
                        component={InputTextArea}
                        type="text"
                        name="description"
                        id="description"
                        label="Description"
                        validate={[required, nonEmpty]}
                        disabled={pristine || submitting}
                    />                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Field 
                            component={InputWorkLog}
                            type="file"
                            name="newTicketFiles"
                            id="newTicketFiles"
                            disabled={submitting}
                            label="Upload Files"
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-12">
                        <button type="submit" disabled={pristine || submitting || invalid }>
                            Submit
                        </button>
                        <button type="button" onClick={reset}>Clear</button>      
                    </div>
                </div>       
            </form>
        )
    }
}

const mapStateToProps = state => {
    const formValues = getFormValues('newTicket')(state);

    return {
        assignee: formValues? formValues.assignee : undefined,
        currentAssignee: formValues? formValues.userSelect : undefined
    }
}

export default connect(mapStateToProps)(reduxForm ({
    form: 'newTicket'
})(NewTicket))