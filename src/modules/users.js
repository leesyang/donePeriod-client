import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from '../utils/errors';

// ----- import: actions -----
import { login } from '../modules/auth';

export const registerUser = user => dispatch => {
    let userInfo = user;
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(user => {
            dispatch(login(userInfo.username, userInfo.password))
            userInfo = {};
        })
        .catch(err => {
            console.log(err)
            const {reason, message, location} = err;
            if (reason === 'ValidationError') { 
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                   throw new SubmissionError({
                        [location]: message
                    })
            }
        });
};