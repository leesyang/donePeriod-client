// ----- SIGNUP FORM -----
import React from 'react';
import { reduxForm , Field } from 'redux-form';

// ----- components -----
import Input from '../login/form/Input';

// ----- actions -----
import { registerUser } from '../../modules/users';

// ----- validators -----
import {required, nonEmpty, isTrimmed, length, matches, email } from '../../utils/validators';
const passwordLength = length({min: 10, max: 72});
const usernameLength = length({min: 2, max: 10});
const matchesPassword = matches('password');

export class SignUpForm extends React.Component {
    onSubmit(values) {
        const { dispatch, reset } = this.props;
        return dispatch(registerUser(values)).then(() => reset('login'))
    };

    render () {
        const { handleSubmit, pristine, submitting, invalid } = this.props
        return (
            <form
                onSubmit={handleSubmit(values => this.onSubmit(values))}
                className="auth-form"
                >
                <label htmlFor="firstName">First Name</label>
                <Field 
                    component={Input}
                    type="text"
                    name="firstName"
                    id="firstName"
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                />
                <label htmlFor="lastName">Last Name</label>
                <Field
                    component={Input}
                    type="text"
                    name="lastName"
                    id="lastName"
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                />
                <label htmlFor="username">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    id="username"
                    validate={[required, nonEmpty, usernameLength]}
                    disabled={pristine || submitting}
                />
                <label htmlFor="email">Email</label>
                <Field
                    component={Input}
                    type="text"
                    name="email"
                    id="email"
                    validate={[required, nonEmpty, isTrimmed, email]}
                    disabled={pristine || submitting}
                />
                <label htmlFor="password">Password</label>
                <Field 
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    validate={[required, nonEmpty, isTrimmed, passwordLength]}
                    disabled={pristine || submitting}
                />
                <label htmlFor="confirm">Confirm Password</label>
                <Field 
                    component={Input}
                    type="password"
                    name="confirm"
                    id="confirm"
                    validate={[required, nonEmpty, matchesPassword]}
                    disabled={pristine || submitting}
                />                                
                <button disabled={invalid}>Sign up</button>
            </form>
        )
    };
}

export default reduxForm ({
    form: 'login'
})(SignUpForm)