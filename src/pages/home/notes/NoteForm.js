import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addNote } from '../../../modules/auth';
import { required, nonEmpty } from '../../../utils/validators';

export function NoteForm({ onClick }) {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    function onSubmit(values) {
        dispatch(addNote(values));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('comment', { validate: { required, nonEmpty } })} />
            {errors.comment && <span className="input-error">{errors.comment.message}</span>}
            <button type="submit" disabled={isSubmitting}>Add</button>
            <button type="button" onClick={onClick}>Cancel</button>
        </form>
    );
}

export default NoteForm;
