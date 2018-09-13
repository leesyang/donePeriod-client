// ----- imports -----
import { normalizeResponseErrors } from '../utils/errors';
import { API_BASE_URL } from '../config';
import jwtDecode from 'jwt-decode';
import store from '../store';
import { saveAuthToken, clearAuthToken, loadAuthToken } from '../utils/auth';
import { SubmissionError } from 'redux-form';

// ----- actions -----
export const SET_AUTH_TOKEN = 'app/auth/SET_AUTH_TOKEN';
export const SET_CURRENT_USER = 'app/auth/SET_CURRENT_USER';
export const CLEAR_AUTH = 'app/auth/CLEAR_AUTH';
export const AUTH_REQUEST = 'app/auth/AUTH_REQUEST';
export const AUTH_SUCCESS = 'app/auth/AUTH_SUCCESS';
export const AUTH_ERROR = 'app/auth/AUTH_ERROR';

// ----- initialState -----
const initialState = {
    authToken: null,
    currentUser: null,
    loading: false,
    error: null,
}

// ----- reducer -----
export default function authReducer (state=initialState, action) {
    if(action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, { authToken: action.authToken } )
    }
    else if(action.type === SET_CURRENT_USER) {
        return Object.assign({}, state, { currentUser: action.currentUser })
    }
    else if(action.type === CLEAR_AUTH) {
        return Object.assign({}, state, { authToken: null, currentUser: null })
    }
    else if(action.type === AUTH_REQUEST) {
        return Object.assign({}, state, { loading: true, error: null })
    }
    else if(action.type === AUTH_SUCCESS) {
        return Object.assign({}, state, { loading: false, currentUser: action.currentUser })
    }
    else if(action.type === AUTH_ERROR) {
        return Object.assign({}, state, { loading: false, error: action.error })
    }
    return state;
}


// ----- action creators -----
export const setAuthToken = authToken => (
    { type: SET_AUTH_TOKEN, authToken }
)

export const setCurrentUser = currentUser => (
    { type: SET_CURRENT_USER, currentUser }
)

export const clearAuth = () => (
    { type: CLEAR_AUTH }
)

export const authRequest = () => (
    { type: AUTH_REQUEST }
)

export const authSuccess = currentUser => (
    { type: AUTH_SUCCESS, currentUser }
)

export const authError = error => (
    { type: AUTH_ERROR, error }
)

// ----- successful auth handler -----
export const storeAuthInfo = (authToken, dispatch) => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user));
    saveAuthToken(authToken);
};

export const setAuthFromJwT = (authToken) => dispatch => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(setCurrentUser(decodedToken.user));
}

export const login = (username, password) => dispatch => {
    dispatch(authRequest());
    return (
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        // Reject any requests which don't return a 200 status, creating
        // errors which follow a consistent format
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({authToken}) => storeAuthInfo(authToken, dispatch))
        .catch(err => {
            dispatch(authError(err));
            const {reason, message, location} = err;
            if (reason === 'ValidationError' || 'LoginError') { 
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                   throw new SubmissionError({
                        [location]: message
                    })
            }
        })
    );
};