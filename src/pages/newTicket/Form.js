import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ticketOpt } from '../../components/forms/Consts';
import { required, nonEmpty, length } from '../../utils/validators';
import Input from '../../components/forms/Input';
import DropDown from '../../components/forms/Dropdown';
import UserSelect from '../../components/forms/UserSelect';
import InputWorkLog from '../ticket/activity/workLog/InputWorkLog';
import InputTextArea from '../../components/forms/InputTextArea';
import { postNewTicket, uploadNewTicketAttachments } from '../../modules/ticketsData';
import './Form.css';

const titleLength = length({ min: 2, max: 61 });

export function NewTicketForm({ users }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, control, watch, setValue, reset, formState: { errors, isSubmitting, isValid } } = useForm();

    const assignee = watch('assignee');
    const currentAssignee = watch('userSelect');

    async function onSubmit(formValues) {
        const formData = new FormData();
        Object.keys(formValues)
            .filter(k => k !== 'newTicketFiles' && k !== 'userSelect')
            .forEach(k => formData.append(k, formValues[k]));

        const res = await dispatch(postNewTicket(formData));
        if (res && !res.error) {
            const newTicketId = res.ticketId;
            const formDataFiles = new FormData();
            formDataFiles.append('ticketId', res.ticketId);
            if (formValues.newTicketFiles) {
                for (let i = 0; i < formValues.newTicketFiles.length; i++) {
                    formDataFiles.append('files', formValues.newTicketFiles.item(i));
                }
            }
            await dispatch(uploadNewTicketAttachments(formDataFiles, res._id));
            reset();
            navigate(`/issues/${newTicketId}`);
        }
    }

    return (
        <form className="new-ticket-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-6">
                    <DropDown label="Type" options={ticketOpt.type} error={errors.type}
                        {...register('type', { validate: { required, nonEmpty } })} />
                </div>
                <div className="col-6">
                    <DropDown label="Priority" options={ticketOpt.priority} error={errors.priority}
                        {...register('priority', { validate: { required, nonEmpty } })} />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    {!assignee ? (
                        <Controller
                            name="userSelect"
                            control={control}
                            rules={{ validate: { required, nonEmpty } }}
                            render={({ field: { value, onChange } }) => (
                                <UserSelect
                                    value={value || ''}
                                    onChange={onChange}
                                    onSelect={(userId, fullName) => {
                                        setValue('assignee', userId, { shouldValidate: true });
                                        setValue('userSelect', fullName, { shouldValidate: true });
                                    }}
                                    users={users}
                                    error={errors.userSelect}
                                />
                            )}
                        />
                    ) : (
                        <button className="user-selected" type="button" onClick={() => setValue('assignee', '')}>
                            {currentAssignee}
                        </button>
                    )}
                    <input type="hidden" {...register('assignee', { validate: { required, nonEmpty } })} />
                </div>
                <div className="col-6">
                    <Input type="date" label="Due Date" error={errors.dueDate}
                        {...register('dueDate', { validate: { required, nonEmpty } })} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Input type="text" label="Title" error={errors.title}
                        {...register('title', { validate: { required, nonEmpty, titleLength } })} />
                    <InputTextArea label="Description" error={errors.description}
                        {...register('description', { validate: { required, nonEmpty } })} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <InputWorkLog type="file" label="Upload Files" error={errors.newTicketFiles}
                        {...register('newTicketFiles')} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <button type="submit" disabled={isSubmitting || !isValid}>Submit</button>
                    <button type="button" onClick={() => reset()}>Clear</button>
                </div>
            </div>
        </form>
    );
}

export default NewTicketForm;
