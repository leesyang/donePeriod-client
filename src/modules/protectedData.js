import React from 'react';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils/errors';
import { temp_data } from './ticketTempData';

// ----- actions -----
export const FETCH_PROTECTED_DATA_REQUEST = 'app/protectedData/FETCH_PROTECTED_DATA_REQUEST';
export const FETCH_PROTECTED_DATA_SUCCESS = 'app/protectedData/FETCH_PROTECTED_DATA_SUCCESS';
export const FETCH_PROTECTED_DATA_ERROR = 'app/protectedData/FETCH_PROTECTED_DATA_ERROR';
export const POST_NEW_TICKET = 'app/protectedData/POST_NEW_TICKET';

// ----- intial state -----
const initialState = {
    initialGet: false,
    modified: false,
}

// ----- reducer -----
export default function protectedDataReducer (state=initialState, action) {
    if(action.type === FETCH_PROTECTED_DATA_REQUEST) {
        return Object.assign({}, state, { isLoading: true })
    }
    if(action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        console.log(action.data)
        return Object.assign({}, state, { initialGet: true, isLoading: false, tickets: action.data });
    }
    if(action.type === FETCH_PROTECTED_DATA_ERROR) {
        console.log('there was a err')
        return Object.assign({}, state, { isLoading: false, error: true, errorInfo: action.err})
    }
    return state;
}

// ----- action creators -----
export const fetchProtectedDataSuccess = data => (
    { type: FETCH_PROTECTED_DATA_SUCCESS, data }
);

export const fetchProtectedDataError = error => (
    { type: FETCH_PROTECTED_DATA_ERROR, error }
);

export const fetchProtectedDataRequest = () => (
    { type: FETCH_PROTECTED_DATA_REQUEST }
)

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(fetchProtectedDataRequest());
    return fetch(`${API_BASE_URL}/tickets`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(json => dispatch(fetchProtectedDataSuccess(json)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};

export const postNewTicket = (ticket) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/tickets`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json; charset=utf-8"
            },
        body: JSON.stringify(ticket)
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => {
            console.log('there was an error')
        });
}