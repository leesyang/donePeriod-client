import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

// ----- components -----
import Input from '../../../components/forms/Input';
import InputTextArea from '../../../components/forms/InputTextArea'

// ----- actions -----
import { updateDescription } from '../../../modules/ticket';

export class EditFormDescription extends React.Component {
    onSubmit(values) {
        const { dispatch } = this.props;
        dispatch(updateDescription(values))
    }


    render () {
        const { handleSubmit, pristine, submitting } = this.props;
        console.log(this.props)
        return (
            <form
                className="description-edit-form"
                onSubmit={handleSubmit(description => this.onSubmit(description))}
                >
                <Field
                    component={InputTextArea}
                    type="text"
                    name="description"
                    id="description"
                />
                <button type="submit" disabled={pristine || submitting}>Submit</button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    const current = state.ticket.description.text;
    const initialValues = { description: current }
    return { initialValues }
}

export default connect(mapStateToProps)(reduxForm ({
    form: 'editDescription'
})(EditFormDescription))