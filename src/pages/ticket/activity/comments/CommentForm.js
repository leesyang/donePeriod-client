import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputTextArea from '../../../../components/forms/InputTextArea';

// ----- actions -----
import { postComment } from '../../../../modules/ticket';

export class CommentForm extends React.Component {
    onSubmit(values) {
        const { reset } = this.props;
        return this.props.dispatch(postComment(values))
        .then(() => reset('commentForm'));
    }

    render() {
        const { handleSubmit, pristine, submitting, reset } = this.props
        return (
            <form
                className="comment-form"
                onSubmit={handleSubmit(values => this.onSubmit(values))}
                >
                <Field 
                    component={InputTextArea}
                    type="text"
                    name="comment"
                    id="comment"
                    label="Comment"

                />
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Reset</button>
            </form>
        )
    }
}

export default reduxForm ({
    form: 'commentForm'
})(CommentForm)