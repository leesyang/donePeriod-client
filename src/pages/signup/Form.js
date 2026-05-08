import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Input from '../login/form/Input';
import { registerUser } from '../../modules/users';
import { required, nonEmpty, isTrimmed, length, email } from '../../utils/validators';

const passwordLength = length({ min: 10, max: 72 });
const usernameLength = length({ min: 2, max: 10 });

export function SignUpForm() {
    const dispatch = useDispatch();
    const { register, handleSubmit, setError, getValues, formState: { errors, isSubmitting, isValid } } = useForm({ mode: 'onChange' });

    async function onSubmit(values) {
        try {
            await dispatch(registerUser(values));
        } catch (err) {
            if (err?.location) setError(err.location, { message: err.message });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <label htmlFor="firstName">First Name</label>
            <Input type="text" error={errors.firstName}
                {...register('firstName', { validate: { required, nonEmpty } })} />
            <label htmlFor="lastName">Last Name</label>
            <Input type="text" error={errors.lastName}
                {...register('lastName', { validate: { required, nonEmpty } })} />
            <label htmlFor="username">Username</label>
            <Input type="text" error={errors.username}
                {...register('username', { validate: { required, nonEmpty, usernameLength } })} />
            <label htmlFor="email">Email</label>
            <Input type="text" error={errors.email}
                {...register('email', { validate: { required, nonEmpty, isTrimmed, email } })} />
            <label htmlFor="password">Password</label>
            <Input type="password" error={errors.password}
                {...register('password', { validate: { required, nonEmpty, isTrimmed, passwordLength } })} />
            <label htmlFor="confirm">Confirm Password</label>
            <Input type="password" error={errors.confirm}
                {...register('confirm', {
                    validate: {
                        required,
                        nonEmpty,
                        matches: v => v === getValues('password') || 'Does not match',
                    }
                })} />
            <button disabled={!isValid || isSubmitting}>Sign up</button>
        </form>
    );
}

export default SignUpForm;
