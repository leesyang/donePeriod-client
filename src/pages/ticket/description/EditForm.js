import React from 'react';
import { reduxForm, Field } from 'redux-form';

// ----- actions -----
import { updateDescription } from '../../../modules/ticket';

export class EditFormDescription extends React.Component {
    onSubmit (values) {
        const { dispatch } = this.props;
        console.log(values);
        dispatch(updateDescription(values))
    }

    render () {
        const { handleSubmit, pristine, submitting } = this.props
        return (
            <form
                className="description-edit-form"
                onSubmit={handleSubmit(description => this.onSubmit(description))}
                >
                <label htmlFor="description">Description: </label>
                <Field
                    component="input"
                    type="text"
                    name="description"
                    id="description"

                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default reduxForm ({
    form: 'editDescription'
})(EditFormDescription)