import React from 'react';
import { reduxForm, Field } from 'redux-form';
//import Input from '../../../components/forms/Input';
import DropDown from '../../../components/forms/Dropdown';

// ----- consts -----
import { ticketOpt } from '../../../components/forms/Consts';

// ----- validators -----
import {required, nonEmpty } from '../../../utils/validators';

// ----- actions -----
import { updateInfo } from '../../../modules/ticket';

export class EditFormInfo extends React.Component {
    onSubmit (values) {
        const { dispatch } = this.props;
        dispatch(updateInfo(values))
    }

    render () {
        const { handleSubmit, pristine, submitting } = this.props;
        const { 
            type,
            status,
            priority,
            resolution
            } = this.props.ticketInfo;

        return (
            <form
                className="ticket-edit-form"
                onSubmit={handleSubmit(values => this.onSubmit(values))}
                >
                <Field
                    component={DropDown}
                    type="text"
                    name="type"
                    id="type"
                    label="Type"
                    options={ticketOpt.type}
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                    currentValue={type}
                />
                <Field
                    component={DropDown}
                    type="text"
                    name="status"
                    id="status"
                    label="Status"
                    options={ticketOpt.status}
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                    currentValue={status}
                />
                <Field
                    component={DropDown}
                    type="text"
                    name="priority"
                    id="priority"
                    label="Priority"
                    options={ticketOpt.priority}
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                    currentValue={priority}
                />
                <Field
                    component={DropDown}
                    type="text"
                    name="resolution"
                    id="resolution"
                    label="Resolution"
                    options={ticketOpt.resolution}
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                    currentValue={resolution}
                />
                <button type="submit" disabled={pristine || submitting}>Submit</button>
            </form>
        )
    }
}

export default reduxForm ({
    form: 'editInfo'
})(EditFormInfo)