import React from 'react';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

// ----- consts -----
import { ticketOpt } from '../../components/forms/Consts';

// ----- validators -----
import {required, nonEmpty, length } from '../../utils/validators';

// ----- components -----
import Input from '../../components/forms/Input';
import DropDown from '../../components/forms/Dropdown';
import UserSelect from '../../components/forms/UserSelect';
import InputWorkLog from '../../pages/ticket/activity/workLog/InputWorkLog';
import InputTextArea from '../../components/forms/InputTextArea'

// ----- actions -----
import { postNewTicket, uploadNewTicketAttachments } from '../../modules/ticketsData';

// ----- css -----
import './Form.css';

const titleLength = length({min: 2, max: 61});

export class NewTicket extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(formValues) {
        // creates form data obj, confirm valid assignee, then upload file using new form data
        const { dispatch, reset } = this.props;
        const formData = new FormData();
        Object.keys(formValues).filter(word => !(word === 'newTicketFiles'))
        .forEach(key => formData.append(`${key}`, formValues[key]))
        
        let newTicketId;

        return dispatch(postNewTicket(formData))
        .then(res => {
            if(!res.error){
                const ticket_Id = res._id;

                newTicketId = res.ticketId;

                let formDataFiles = new FormData();

                formDataFiles.append('ticketId', res.ticketId)
                if(formValues.newTicketFiles) {
                    for (let i = 0; i < formValues.newTicketFiles.length; i++) {
                        formDataFiles.append(`files`, formValues.newTicketFiles.item(i))
                    }
                }
                return dispatch(uploadNewTicketAttachments(formDataFiles, ticket_Id))
                .then(() => {
                    reset('newTicket');
                    this.props.history.push(`/issues/${newTicketId}`);
                })
            }
        })
    }

    onClickAssign() {
        const { change } = this.props;
        change('assignee', '');
    }
    
    render() {
        const { handleSubmit,
            pristine,
            submitting,
            invalid,
            reset,
            users,
            change,
            assignee,
            currentAssignee } = this.props

        const userSearch = (
            <Field
                component={UserSelect}
                type="text"
                name="userSelect"
                id="userSelect"
                label="Assign to"
                users={users}
                change={change}
                validate={[required, nonEmpty]}
                disabled={pristine || submitting}
            />
        )

        return (
            <form
                className="new-ticket-form"
                onSubmit={handleSubmit(values => this.onSubmit(values))}
                >
                <div className="row">
                    <div className="col-6">
                        <Field
                            component={DropDown}
                            type="text"
                            name="type"
                            id="type"
                            label="Type"
                            options={ticketOpt.type}
                            validate={[required, nonEmpty]}
                            disabled={pristine || submitting}
                        />
                    </div>
                    <div className="col-6">
                        <Field
                            component={DropDown}
                            type="text"
                            name="priority"
                            id="priority"
                            label="Priority"
                            options={ticketOpt.priority}
                            validate={[required, nonEmpty]}
                            disabled={pristine || submitting}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {!assignee? userSearch : (<button className="user-selected" onClick={() => this.onClickAssign()}>{currentAssignee}</button>) }
                        <Field
                            component='input'
                            type="hidden"
                            name="assignee"
                            id="assignee"
                            validate={[required, nonEmpty]}
                            disabled={pristine || submitting}
                        />
                    </div>
                    <div className="col-6">
                        <Field
                            component={Input}
                            type="date"
                            name="dueDate"
                            id="dueDate"
                            label="Due Date"
                            validate={[required, nonEmpty]}
                            disabled={pristine || submitting}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                    <Field
                        component={Input}
                        type="text"
                        name="title"
                        id="title"
                        label="Title"
                        validate={[required, nonEmpty, titleLength]}
                        disabled={pristine || submitting}
                    />
                    <Field
                        component={InputTextArea}
                        type="text"
                        name="description"
                        id="description"
                        label="Description"
                        validate={[required, nonEmpty]}
                        disabled={pristine || submitting}
                    />                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Field 
                            component={InputWorkLog}
                            type="file"
                            name="newTicketFiles"
                            id="newTicketFiles"
                            disabled={submitting}
                            label="Upload Files"
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-12">
                        <button type="submit" disabled={pristine || submitting || invalid }>
                            Submit
                        </button>
                        <button type="button" onClick={reset}>Clear</button>      
                    </div>
                </div>       
            </form>
        )
    }
}

const mapStateToProps = state => {
    const formValues = getFormValues('newTicket')(state);

    return {
        assignee: formValues? formValues.assignee : undefined,
        currentAssignee: formValues? formValues.userSelect : undefined
    }
}

export default withRouter(connect(mapStateToProps)(reduxForm ({
    form: 'newTicket'
})(NewTicket)))