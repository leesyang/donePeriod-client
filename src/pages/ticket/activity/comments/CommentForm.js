import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import InputTextArea from '../../../../components/forms/InputTextArea';
import { postComment } from '../../../../modules/ticket';

export function CommentForm() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

    async function onSubmit(values) {
        await dispatch(postComment(values));
        reset();
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
            <InputTextArea label="Comment" {...register('comment')} />
            <button type="submit" disabled={isSubmitting}>Submit</button>
            <button type="button" disabled={isSubmitting} onClick={() => reset()}>Reset</button>
        </form>
    );
}

export default CommentForm;
