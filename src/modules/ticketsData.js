import { createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils/errors';

const initialState = {
    initialGet: false,
    isLoading: false,
    isPosting: false,
};

const ticketsDataSlice = createSlice({
    name: 'protectedData',
    initialState,
    reducers: {
        getTicketsRequest(state) {
            state.isLoading = true;
        },
        getTicketsSuccess(state, action) {
            state.initialGet = true;
            state.isLoading = false;
            state.tickets = action.payload;
        },
        getTicketsError(state, action) {
            state.isLoading = false;
            state.error = true;
            state.errorInfo = action.payload;
        },
        clearTickets() {
            return { ...initialState };
        },
        postTicketRequest(state) {
            state.isPosting = true;
        },
        postTicketSuccess(state, action) {
            state.isPosting = false;
            state.tickets = [...state.tickets, action.payload];
        },
        postTicketError(state, action) {
            state.error = action.payload;
        },
        updateModifiedTicket(state, action) {
            state.tickets = [
                ...state.tickets.filter(ticket => !(ticket.ticketId === action.payload.ticketId)),
                action.payload,
            ];
        },
    },
});

export const {
    getTicketsRequest,
    getTicketsSuccess,
    getTicketsError,
    clearTickets,
    postTicketRequest,
    postTicketSuccess,
    postTicketError,
    updateModifiedTicket,
} = ticketsDataSlice.actions;

export default ticketsDataSlice.reducer;

// ----- action functions -----
export const getTickets = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(getTicketsRequest());
    return fetch(`${API_BASE_URL}/tickets`, {
        method: 'GET',
        headers: {
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
};

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
};

export const updateTicketfromReducer = () => (dispatch, getState) => {
    const updatedTicket = getState().ticket;
    dispatch(updateModifiedTicket(updatedTicket));
};
