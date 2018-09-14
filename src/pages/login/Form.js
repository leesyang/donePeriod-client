import React from 'react';
import { reduxForm , Field } from 'redux-form';

// ----- components -----
import Input from './form/Input';

// ----- validators -----
import {required, nonEmpty } from '../../utils/validators';

// ----- actions -----
import { login } from '../../modules/auth';

export class Form extends React.Component {
    onSubmit(values) {
        const { dispatch, reset } = this.props;
        return dispatch(login(values.username, values.password))
        .then(() => reset('login'))
    };

    render () {
        const { handleSubmit, pristine, submitting } = this.props
        return (
            <form
                onSubmit={handleSubmit(values => this.onSubmit(values))}
                className="login-form"
                >
                <Field 
                    component={Input}
                    type="text"
                    name="username"
                    id="username"
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                    label="Username"
                />
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    validate={[required, nonEmpty]}
                    disabled={pristine || submitting}
                    label="Password"
                />
                <button type="submit">Log In</button>
            </form>
        )
    };
}

export default reduxForm ({
    form: 'login'
})(Form)