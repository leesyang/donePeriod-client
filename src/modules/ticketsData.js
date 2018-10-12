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

export const UPDATE_MODIFIED_TICKET = 'app/auth/UPDATE_MODIFIED_TICKET';
export const CLEAR_TICKET_DATA = 'app/auth/CLEAR_TICKET_DATA';

// ----- intial state -----
const initialState = {
    initialGet: false,
    isLoading: false,
    isPosting: false
}

// ----- reducer -----
export default function protectedDataReducer (state=initialState, action) {
    // get tickets
    if(action.type === GET_TICKETS_REQUEST) {
        return Object.assign({}, state, { isLoading: true })
    }
    if(action.type === GET_TICKETS_SUCCESS) {
        return Object.assign({}, state, { initialGet: true, isLoading: false, tickets: action.data});
    }
    if(action.type === GET_TICKETS_ERROR) {
        console.log('there was a err')
        return Object.assign({}, state, { isLoading: false, error: true, errorInfo: action.err});
    }

    // clear tickets
    if(action.type === CLEAR_TICKET_DATA) {
        return Object.assign({}, initialState);
    }

    // post new ticket
    if(action.type === POST_TICKET_REQUEST) {
        return Object.assign({}, state, { isPosting: true })
    }
    if(action.type === POST_TICKET_SUCCESS) {
        let asdf = Object.assign({}, state, {isPosting: false, tickets: [...state.tickets, action.data] })
        console.log(asdf);
        return asdf;
    }
    if(action.type === POST_TICKET_ERROR) {
        return Object.assign({}, state, { error: action.error })
    }
    // update modified ticket from reducer
    if(action.type === UPDATE_MODIFIED_TICKET) {
        return Object.assign({}, state, { tickets: [...state.tickets.filter(ticket => !(ticket.ticketId === action.data.ticketId)), action.data ]})
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

// update ticket
export const updateModifiedTicket = (ticket) => (
    { type: UPDATE_MODIFIED_TICKET, data: ticket }
)

// clear tickets
export const clearTickets = () => (
    { type: CLEAR_TICKET_DATA }
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

export const postNewTicket = (formData) => (dispatch, getState) => {
    dispatch(postTicketRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/tickets`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`,
            },
        body: formData
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => dispatch(postTicketError(err)));
}

export const uploadNewTicketAttachments = (formData, ticket_Id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/tickets/${ticket_Id}/attachments`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`
            },
        body: formData
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(ticket => dispatch(postTicketSuccess(ticket)))
        .catch(err => dispatch(postTicketError(err)));
}

export const updateTicketfromReducer = () => (dispatch, getState) => {
    const updatedTicket = getState().ticket;
    dispatch(updateModifiedTicket(updatedTicket))
}
