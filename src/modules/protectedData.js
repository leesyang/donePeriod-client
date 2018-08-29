import React from 'react';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils/errors';

// ----- actions -----
export const FETCH_PROTECTED_DATA_SUCCESS = 'app/protectedData/FETCH_PROTECTED_DATA_SUCCESS';
export const FETCH_PROTECTED_DATA_ERROR = 'app/protectedData/FETCH_PROTECTED_DATA_ERROR';

// ----- reducer -----
export default function protectedDataReducer (state={}, action) {
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
    return fetch(`${API_BASE_URL}/issues`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};
