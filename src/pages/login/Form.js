import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Input from './form/Input';
import { login } from '../../modules/auth';
import { required, nonEmpty } from '../../utils/validators';

export function LoginForm() {
    const dispatch = useDispatch();
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

    async function onSubmit(values) {
        try {
            await dispatch(login(values.username, values.password));
        } catch (err) {
            if (err?.location) setError(err.location, { message: err.message });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <Input
                type="text"
                label="Username"
                autoComplete="username"
                error={errors.username}
                {...register('username', { validate: { required, nonEmpty } })}
            />
            <Input
                type="password"
                label="Password"
                autoComplete="current-password"
                error={errors.password}
                {...register('password', { validate: { required, nonEmpty } })}
            />
            <button type="submit" disabled={isSubmitting}>Log In</button>
        </form>
    );
}

export default LoginForm;
