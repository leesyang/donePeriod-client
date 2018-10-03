import React from 'react';
import { reduxForm, Field } from 'redux-form';

// ----- consts -----
import { ticketOpt } from '../../components/forms/Consts';

// ----- validators -----
import {required, nonEmpty } from '../../utils/validators';

// ----- components -----
import Input from '../../components/forms/Input';
import DropDown from '../../components/forms/Dropdown';
import UserSelect from '../../components/forms/UserSelect';
import InputWorkLog from '../../pages/ticket/activity/workLog/InputWorkLog';

// ----- actions -----
import { postNewTicket } from '../../modules/ticketsData';

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
        for (let i = 0; i < formValues.newTicketFiles.length; i++) {
            formData.append(`files`, formValues.newTicketFiles.item(i))
        }
        return dispatch(postNewTicket(formData))
        .then(() => reset('newTicket'))
    }
    
    render() {
        const { handleSubmit, pristine, submitting, invalid, reset, users, change } = this.props

        return (
            <form
                className="new-ticket-form"
                onSubmit={handleSubmit(values => this.onSubmit(values))}
                >
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
                <Field
                    component={Input}
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    label="Due Date"
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                />
                <Field
                    component={Input}
                    type="text"
                    name="description"
                    id="description"
                    label="Description"
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                />
                <Field
                    component={UserSelect}
                    type="text"
                    name="assignee"
                    id="assignee"
                    label="Assign to"
                    users={users}
                    change={change}
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                />
                <Field 
                    component={InputWorkLog}
                    type="file"
                    name="newTicketFiles"
                    id="newTicketFiles"
                    disabled={submitting}
                    label="Upload Files"
                />
                <button type="submit" disabled={pristine || submitting || invalid }>
                    Submit
                </button>
                <button type="button" onClick={reset}>
                    Clear
                </button>                                  
            </form>
        )
    }
}

export default reduxForm ({
    form: 'newTicket'
})(NewTicket)