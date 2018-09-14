import React from 'react';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils/errors';

// ----- actions -----
export const GET_TICKETS_REQUEST = 'app/protectedData/GET_TICKETS_REQUEST';
export const GET_TICKETS_SUCCESS = 'app/protectedData/GET_TICKETS_SUCCESS';
export const GET_TICKETS_ERROR = 'app/protectedData/GET_TICKETS_ERROR';

export const POST_TICKET_REQUEST = 'app/protectedData/POST_TICKET_REQUEST';
export const POST_TICKET_SUCCESS = 'app/protectedData/POST_TICKET_SUCCESS';
export const POST_TICKET_ERROR = 'app/protectedData/POST_TICKET_ERROR';

// ----- intial state -----
const initialState = {
    initialGet: false,
    modified: false,
    isLoading: false,
    isPosting: false
}

// ----- reducer -----
export default function protectedDataReducer (state=initialState, action) {
    if(action.type === GET_TICKETS_REQUEST) {
        return Object.assign({}, state, { isLoading: true })
    }
    if(action.type === GET_TICKETS_SUCCESS) {
        return Object.assign({}, state, { initialGet: true, isLoading: false, tickets: action.data});
    }
    if(action.type === GET_TICKETS_ERROR) {
        console.log('there was a err')
        return Object.assign({}, state, { isLoading: false, error: true, errorInfo: action.err})
    }
    if(action.type === POST_TICKET_REQUEST) {
        return Object.assign({}, state, { isPosting: true })
    }
    if(action.type === POST_TICKET_SUCCESS) {
        return Object.assign({}, state, {isPosting: false, tickets: [...state.tickets, action.data] })
    }
    if(action.type === POST_TICKET_ERROR) {
        return Object.assign({}, state, { error: action.error })
    }
    return state;
}

// ----- action creators -----
export const getTicketsSuccess = data => (
    { type: GET_TICKETS_SUCCESS, data }
);

export const getTicketsError = error => (
    { type: GET_TICKETS_ERROR, error }
);

export const getTicketsRequest = () => (
    { type: GET_TICKETS_REQUEST }
)

// post new ticket
export const postTicketRequest = () => (
    { type: POST_TICKET_REQUEST }
)
export const postTicketSuccess = (ticket) => (
    { type: POST_TICKET_SUCCESS, data: ticket }
)
export const postTicketError = (error) => (
    { type: POST_TICKET_ERROR, error: error }
)

// ----- action functions -----
export const getTickets = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(getTicketsRequest());
    return fetch(`${API_BASE_URL}/tickets`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(json => dispatch(getTicketsSuccess(json)))
        .catch(err => {
            dispatch(getTicketsError(err));
        });
};

export const postNewTicket = (ticket) => (dispatch, getState) => {
    dispatch(postTicketRequest());
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
        .then(json => {console.log(json); dispatch(postTicketSuccess(json))})
        .catch(err => {
            dispatch(postTicketError(err))
        });
}