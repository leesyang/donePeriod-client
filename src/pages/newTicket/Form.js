import React from 'react';
import { reduxForm, Field } from 'redux-form';

// ----- validators -----
import {required, nonEmpty } from '../../utils/validators';

// ----- components -----
import Input from '../../components/forms/Input';

// ----- actions -----
import { postNewTicket } from '../../modules/protectedData';

export class NewTicket extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {
        this.props.dispatch(postNewTicket(values))
    }
    
    render() {
        const { handleSubmit, pristine, submitting, invalid, reset } = this.props
        return (
            <form
                className="new-ticket-form"
                onSubmit={handleSubmit(values => this.onSubmit(values))}
                >
                <Field
                    component={Input}
                    type="text"
                    name="type"
                    id="type"
                    label="Type"
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                />
                <Field
                    component={Input}
                    type="text"
                    name="priority"
                    id="priority"
                    label="Priority"
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