import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Input from './Input';
import { uploadProfilePicture } from '../../../modules/auth';
import { containsFile } from '../../../utils/validators';

export function UploadPictureForm() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({ mode: 'onChange' });

    function onSubmit(values) {
        const formData = new FormData();
        formData.append('profilePicture', values.profilePicture[0]);
        Object.defineProperty(formData, 'isFormData', { value: true });
        dispatch(uploadProfilePicture(formData));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="upload-pic-form">
            <Input
                type="file"
                label="Upload a picture"
                error={errors.profilePicture}
                {...register('profilePicture', { validate: containsFile })}
            />
            <button type="submit" disabled={!isValid || isSubmitting}>Submit</button>
        </form>
    );
}

export default UploadPictureForm;
