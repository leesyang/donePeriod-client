import React from 'react';
import { reduxForm, Field } from 'redux-form';

// ----- actions -----
import { addNote } from '../../../modules/auth';

// ----- validators -----
import { required, nonEmpty, isTrimmed } from '../../../utils/validators';

export class NoteForm extends React.Component {
    onSubmit(values){
        console.log(values)
        this.props.dispatch(addNote(values));
    }

    render() {
        const { handleSubmit, pristine, submitting, invalid } = this.props
        return (
            <form
                onSubmit={handleSubmit(values => this.onSubmit(values))}
            >
                <Field
                    component="input"
                    type="text"
                    name="comment"
                    id="comment"
                    label="New Note"
                    validate={[required, nonEmpty]}
                />
                <button
                    type="submit"
                    disable={[pristine, submitting, invalid]}
                >Add</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'noteForm'
})(NoteForm)