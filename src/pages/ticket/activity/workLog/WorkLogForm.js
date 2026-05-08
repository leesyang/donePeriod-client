import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import InputWorkLog from './InputWorkLog';
import InputTextArea from '../../../../components/forms/InputTextArea';
import { postWorkLog } from '../../../../modules/ticket';

export function WorkLogForm() {
    const dispatch = useDispatch();
    const ticketId = useSelector(s => s.ticket.ticketId);
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    function onSubmit(formValues) {
        const formData = new FormData();
        formData.append('comment', formValues.comment);
        formData.append('ticketId', ticketId);
        if (formValues.files) {
            for (let i = 0; i < formValues.files.length; i++) {
                formData.append('files', formValues.files.item(i));
            }
        }
        Object.defineProperty(formData, 'isFormData', { value: true });
        dispatch(postWorkLog(formData));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="upload-ticket-files">
            <InputTextArea label="Enter Work Log" {...register('comment')} />
            <InputWorkLog type="file" label="Upload Files" {...register('files')} />
            <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
    );
}

export default WorkLogForm;
