import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import InputTextArea from '../../../components/forms/InputTextArea';
import { updateDescription } from '../../../modules/ticket';

export function EditFormDescription({ onCancel }) {
    const dispatch = useDispatch();
    const currentText = useSelector(s => s.ticket.description.text);
    const { register, handleSubmit, formState: { isSubmitting } } = useForm({
        defaultValues: { description: currentText },
    });

    function onSubmit(values) {
        dispatch(updateDescription(values));
    }

    return (
        <form className="description-edit-form" onSubmit={handleSubmit(onSubmit)}>
            <InputTextArea {...register('description')} />
            <button type="submit" disabled={isSubmitting}>Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}

export default EditFormDescription;
