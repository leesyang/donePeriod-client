import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../../../components/forms/Input';

// ----- actions -----
import { updateInfo } from '../../../modules/ticket';

export class EditFormInfo extends React.Component {
    onSubmit (values) {
        const { dispatch } = this.props;
        dispatch(updateInfo(values))
    }

    render () {
        const { handleSubmit, pristine, submitting } = this.props
        console.log(pristine, submitting)
        return (
            <form
                className="ticket-edit-form"
                onSubmit={handleSubmit(values => this.onSubmit(values))}
                >
                <Field
                    component={Input}
                    type="text"
                    name="type"
                    id="type"
                    label="Type"
                />
                <Field
                    component={Input}
                    type="text"
                    name="status"
                    id="status"
                    label="Status"
                />
                <Field
                    component={Input}
                    type="text"
                    name="priority"
                    id="priority"
                    label="Priority"
                />
                <Field
                    component={Input}
                    type="text"
                    name="resolution"
                    id="resolution"
                    label="Resolution"
                />
                <button type="submit" disabled={pristine || submitting}>Submit</button>
            </form>
        )
    }
}

export default reduxForm ({
    form: 'editInfo'
})(EditFormInfo)