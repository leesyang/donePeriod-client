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

/*     onReset() {
        const { dispatch, clearFields } = this.props;
        dispatch(clearFields('editDescription', false, true, ['description']));
        console.log('asdf')
    } */

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
                    label="Description"
                />
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                {/* <button type="button" onClick={() => this.onReset()}>Reset</button> */}
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