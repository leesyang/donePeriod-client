import React from 'react';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils/errors';

// ----- actions -----
export const FETCH_PROTECTED_DATA_SUCCESS = 'app/protectedData/FETCH_PROTECTED_DATA_SUCCESS';
export const FETCH_PROTECTED_DATA_ERROR = 'app/protectedData/FETCH_PROTECTED_DATA_ERROR';

// ----- intial state -----
const initialState = {
    tickets: null,
    intialGet: true,
    modified: false,
}


// ----- reducer -----
export default function protectedDataReducer (state=initialState, action) {
    if(action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        console.log(action.data)
        return Object.assign({}, state, { tickets: action.data });
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

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
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
