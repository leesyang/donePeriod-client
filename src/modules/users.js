import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from '../utils/errors';

// ----- import: actions -----
import { login } from '../modules/auth';

// ----- actions -----
export const GET_USERS_REQUEST = 'app/user/GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'app/user/GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'app/user/GET_USERS_ERROR';
export const CLEAR_USERS = 'app/user/CLEAR_USERS';

const urInitialState = {};

// ----- reducer -----
export default function usersReducer (state=urInitialState, action) {
    if(action.type === GET_USERS_REQUEST) {
        return Object.assign({}, state, { loading: true })
    }
    if(action.type === GET_USERS_SUCCESS) {
        return Object.assign({}, state, { loading: false, all: action.data })
    }
    if(action.type === GET_USERS_ERROR) {
        return Object.assign({}, state, { loading: false, error: action.error })
    }
    if(action.type === CLEAR_USERS) {
        return Object.assign({}, urInitialState)
    }
    return state;
}

// ----- action creators -----
export const getUsersRequest = () => (
    { type: GET_USERS_REQUEST }
)
export const getUsersSuccess = (users) => (
    { type: GET_USERS_SUCCESS, data: users }
)
export const getUsersError = (error) => (
    { type: GET_USERS_ERROR, error: error }
)
export const clearUsers = (error) => (
    { type: CLEAR_USERS }
)

// ----- get list of users -----
export const getUsers = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(getUsersRequest());
    return fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(users => {
        dispatch(getUsersSuccess(users));
    })
    .catch(err => {
        dispatch(getUsersError(err))
    })
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
            const {reason, message, location} = err;
            if (reason === 'ValidationError') { 
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                   throw new SubmissionError({
                        [location]: message
                    })
            }
        });
};