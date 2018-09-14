import React from 'react';
// import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

// ----- actions -----
import { updateInfo } from '../../../modules/ticket';

export class EditFormInfo extends React.Component {
    onSubmit (values) {
        const { dispatch } = this.props;
        dispatch(updateInfo(values))
    }

    render () {
        const { handleSubmit, pristine, submitting } = this.props
        return (
            <form
                className="ticket-edit-form"
                onSubmit={handleSubmit(values => this.onSubmit(values))}
                >
                <label htmlFor="type">Type: </label>
                <Field
                    component="input"
                    type="text"
                    name="type"
                    id="type"
                />
                <label htmlFor="status">Status: </label>
                <Field
                    component="input"
                    type="text"
                    name="status"
                    id="status"
                />
                <label htmlFor="priority">Priority: </label>
                <Field
                    component="input"
                    type="text"
                    name="priority"
                    id="priority"
                />
                <label htmlFor="resolution">Resolution: </label>
                <Field
                    component="input"
                    type="text"
                    name="resolution"
                    id="resolution"
                />
                <button type="submit" disable={pristine || submitting }>Submit</button>
            </form>
        )
    }
}

export default reduxForm ({
    form: 'editInfo'
})(EditFormInfo)