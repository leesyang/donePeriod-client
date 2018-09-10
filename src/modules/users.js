import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from '../utils/errors';

// ----- import: actions -----
import { login } from '../modules/auth';

// ----- actions -----
export const GET_USER_INFO_SUCCESS = 'app/user/GET_USER_INFO'

// ----- reducer -----
export default function userReducer (state={}, action) {
    return state;
}

// ----- action creators -----
export const fetchUserSuccess = userInfo => (
    { type: GET_USER_INFO_SUCCESS, user: userInfo }
)

// -- get user info --
export const getUserInfo = user => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(userInfo => dispatch(fetchUserSuccess(userInfo)))
}


// -- register user and log in --
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