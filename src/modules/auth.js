// ----- imports -----
import { normalizeResponseErrors } from '../utils/errors';
import { API_BASE_URL } from '../config';
import jwtDecode from 'jwt-decode';
import { saveAuthToken } from '../utils/auth';
import { SubmissionError } from 'redux-form';

// ----- actions -----
export const SET_AUTH_TOKEN = 'app/auth/SET_AUTH_TOKEN';
export const SET_CURRENT_USER = 'app/auth/SET_CURRENT_USER';
export const CLEAR_AUTH = 'app/auth/CLEAR_AUTH';

export const AUTH_REQUEST = 'app/auth/AUTH_REQUEST';
export const AUTH_SUCCESS = 'app/auth/AUTH_SUCCESS';
export const AUTH_ERROR = 'app/auth/AUTH_ERROR';

export const WATCH_TICKET_REQUEST = 'app/auth/WATCH_TICKET_REQUEST';
export const WATCH_TICKET_SUCCESS = 'app/auth/WATCH_TICKET_SUCCESS';
export const WATCH_TICKET_ERROR = 'app/auth/WATCH_TICKET_ERROR';

export const VOTE_TICKET_REQUEST = 'app/auth/VOTE_TICKET_REQUEST';
export const VOTE_TICKET_SUCCESS = 'app/auth/VOTE_TICKET_SUCCESS';
export const VOTE_TICKET_ERROR = 'app/auth/VOTE_TICKET_ERROR';

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
    // watch a ticket
    else if(action.type === WATCH_TICKET_REQUEST) {
        return Object.assign({}, state, { currentUser: {...state.currentUser, watchloading: true} })
    }
    else if(action.type === WATCH_TICKET_SUCCESS) {
        return Object.assign({}, state, { 
            currentUser: {... state.currentUser, 
                watchloading: false, 
                watching: action.data }
        })
    }
    else if(action.type === WATCH_TICKET_ERROR) {
        return Object.assign({}, state, { 
            currentUser: { ...state.currentUser, 
                error: true,
                errorInfo: action.error,
                watchloading: false } })
    }
    // vote for ticket
    else if(action.type === VOTE_TICKET_REQUEST) {
        return Object.assign({}, state, { currentUser: {...state.currentUser, voteloading: true} })
    }
    else if(action.type === VOTE_TICKET_SUCCESS) {
        return Object.assign({}, state, { currentUser: {...state.currentUser, voteloading: false} })
    }
    else if(action.type === VOTE_TICKET_ERROR) {
        return Object.assign({}, state, { currentUser: { ...state.currentUser, error: true, errorInfo: action.error} })
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

// auth request
export const authRequest = () => (
    { type: AUTH_REQUEST }
)
export const authSuccess = currentUser => (
    { type: AUTH_SUCCESS, currentUser }
)
export const authError = error => (
    { type: AUTH_ERROR, error }
)

// watch a ticket
export const watchTicketRequest = () => (
    { type: WATCH_TICKET_REQUEST }
)
export const watchTicketSuccess = (tickets) => (
    { type: WATCH_TICKET_SUCCESS, data: tickets }
)
export const watchTicketError = (error) => (
    { type: WATCH_TICKET_ERROR, error: error }
)

// vote for ticket
export const voteTicketRequest = () => (
    { type: VOTE_TICKET_REQUEST }
)
export const voteTicketSuccess = (userId) => (
    { type: VOTE_TICKET_SUCCESS, data: userId }
)
export const voteTicketError = (error) => (
    { type: VOTE_TICKET_ERROR, error: error }
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

// ----- action functions -----
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

export const watchTicket = (ticket_Id) => (dispatch, getState) => {
    dispatch(watchTicketRequest());

    const { authToken, currentUser } = getState().auth;
    const userId = currentUser.id;

    return (
        fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ticketId: ticket_Id})
        })
    )
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(tickets => dispatch(watchTicketSuccess(tickets)))
    //setTimeout(function() { dispatch(watchTicketSuccess(ticket_Id))}, 2000)
    .catch(err => {
        dispatch(watchTicketError(err));
    })
}

export const voteTicket = (userId) => dispatch => {
    console.log('vote ticket auth')
    dispatch(voteTicketRequest(userId));
    setTimeout(function() { dispatch(voteTicketSuccess(userId))}, 2000)
}