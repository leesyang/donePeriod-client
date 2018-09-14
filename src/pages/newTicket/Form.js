import React from 'react';
import { reduxForm, Field } from 'redux-form';

// ----- validators -----
import {required, nonEmpty } from '../../utils/validators';

// ----- components -----
import Input from '../../components/forms/Input';
import DropDown from '../../components/forms/Dropdown';

// ----- actions -----
import { postNewTicket } from '../../modules/ticketsData';

export class NewTicket extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {
        console.log(values);
        const { dispatch, reset } = this.props;
        return dispatch(postNewTicket(values))
        .then(() => reset('newTicket'))
    }
    
    render() {
        const { handleSubmit, pristine, submitting, invalid, reset } = this.props
        
        const types = [
            { text: 'Incident', value: 'Incident'},
            { text: 'Repair', value: 'Repair'},
            { text: 'Purchase', value: 'Purchase'},
        ]

        const priorities = [
            { text: 'Urgent', value: 'Urgent'},
            { text: 'High', value: 'High' },
            { text: 'Normal', value: 'Normal' },
            { text: 'Low', value: 'Low' }
        ]

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
                    options={types}
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                />
                <Field
                    component={DropDown}
                    type="text"
                    name="priority"
                    id="priority"
                    label="Priority"
                    options={priorities}
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