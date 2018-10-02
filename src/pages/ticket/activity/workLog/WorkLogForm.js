import React from 'react';
import { reduxForm , Field } from 'redux-form';
import InputWorkLog from './InputWorkLog';
import InputTextArea from '../../../../components/forms/InputTextArea';

// ----- actions -----
import { postWorkLog } from '../../../../modules/ticket';

export class WorkLogForm extends React.Component {
    onSubmit(formValues) {
        const { ticketId } = this.props;
        const formData = new FormData();
        formData.append('comment', formValues.comment);
        formData.append('ticketId', ticketId)
        for (let i = 0; i < formValues.files.length; i++) {
            formData.append(`files`, formValues.files.item(i))
        }
        Object.defineProperty(formData, 'isFormData', { value: true });
        this.props.dispatch(postWorkLog(formData));
    };

    render() {
        const { submitting, handleSubmit } = this.props;
        return (
            <form 
                onSubmit={handleSubmit(formValues => this.onSubmit(formValues))}
                className="upload-ticket-files"
                >
                <Field
                    component={InputTextArea}
                    type="text"
                    name="comment"
                    id="worklogComment"
                    label="Enter Work Log"
                />
                <Field 
                    component={InputWorkLog}
                    type="file"
                    name="files"
                    id="ticketFiles"
                    disabled={submitting}
                    label="Upload Files"
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default reduxForm ({
    form: 'workLogForm'
})(WorkLogForm)