// ----- ticket module -----
import { createSlice } from '@reduxjs/toolkit';
import { getTickets } from './ticketsData';

// ----- constants -----
import { PUT, DELETE, POST } from './auth';
import { API_BASE_URL } from '../config';

// ----- utils -----
import { normalizeResponseErrors } from '../utils/errors';

const trInitialState = {};

// ----- slice -----
const ticketSlice = createSlice({
    name: 'ticket',
    initialState: trInitialState,
    reducers: {
        loadedTicket(state, action) {
            const ticketObject = action.payload[0];
            return Object.assign({}, ticketObject, { isLoaded: true, isModified: false, error: false, errorInfo: null, activityView: 'comments' });
        },
        loadTicketError(state) {
            return Object.assign({}, state, { isLoaded: false, error: true });
        },
        clearTicket() {
            return Object.assign({}, trInitialState);
        },
        updateInfoInit(state, action) {
            state.ticketInfo = { ...state.ticketInfo, isEditing: action.payload };
        },
        updateInfoRequest(state) {
            state.ticketInfo = { ...state.ticketInfo, isUpdating: true };
        },
        updateInfoSuccess(state, action) {
            state.ticketInfo = { ...action.payload, isEditing: false, isUpdating: false };
            state.isModified = true;
        },
        updateInfoError(state, action) {
            state.ticketInfo = { ...state.ticketInfo, isEditing: false, error: true, errorInfo: action.payload };
        },
        updateDescriptionInit(state, action) {
            state.description = { ...state.description, isEditing: action.payload };
        },
        updateDescriptionRequest(state) {
            state.description = { ...state.description, isUpdating: true };
        },
        updateDescriptionSuccess(state, action) {
            state.description = { ...state.description, text: action.payload.text, isEditing: false, isUpdating: false };
            state.isModified = true;
        },
        updateDescriptionError(state, action) {
            state.description = { ...state.description, isEditing: false, error: true, errorInfo: action.payload };
        },
        voteTicketRequest(state) {
            state.voteloading = true;
        },
        voteTicketSuccess(state, action) {
            state.voteloading = false;
            state.votes = action.payload;
            state.isModified = true;
        },
        voteTicketError(state, action) {
            state.voteloading = false;
            state.error = action.payload;
        },
        postCommentRequest(state) {
            state.commentsloading = true;
        },
        postCommentSuccess(state, action) {
            state.commentsloading = false;
            state.comments = action.payload;
            state.isModified = true;
        },
        postCommentError(state, action) {
            state.commentsloading = false;
            state.error = action.payload;
        },
        removeCommentRequest(state) {
            state.commentsloading = true;
        },
        removeCommentSuccess(state, action) {
            state.commentsloading = false;
            state.comments = action.payload;
            state.isModified = true;
        },
        removeCommentError(state, action) {
            state.commentsloading = false;
            state.error = action.payload;
        },
        postWorkLogRequest(state) {
            state.workloguploading = true;
        },
        postWorkLogSuccess(state, action) {
            state.workloguploading = false;
            state.worklog = action.payload;
            state.isModified = true;
        },
        postWorkLogError(state, action) {
            state.workloguploading = false;
            state.error = action.payload;
        },
        removeWorkLogRequest(state) {
            state.workloguploading = true;
        },
        removeWorkLogSuccess(state, action) {
            state.workloguploading = false;
            state.worklog = action.payload;
            state.isModified = true;
        },
        removeWorkLogError(state, action) {
            state.workloguploading = false;
            state.error = action.payload;
        },
        changeActView(state, action) {
            state.activityView = action.payload;
        },
    },
});

export const {
    loadedTicket,
    loadTicketError,
    clearTicket,
    updateInfoInit,
    updateInfoRequest,
    updateInfoSuccess,
    updateInfoError,
    updateDescriptionInit,
    updateDescriptionRequest,
    updateDescriptionSuccess,
    updateDescriptionError,
    voteTicketRequest,
    voteTicketSuccess,
    voteTicketError,
    postCommentRequest,
    postCommentSuccess,
    postCommentError,
    removeCommentRequest,
    removeCommentSuccess,
    removeCommentError,
    postWorkLogRequest,
    postWorkLogSuccess,
    postWorkLogError,
    removeWorkLogRequest,
    removeWorkLogSuccess,
    removeWorkLogError,
    changeActView,
} = ticketSlice.actions;

export default ticketSlice.reducer;

// -- location endpoints --
const DESCRIPTION = 'description';
const INFO = 'info';
const COMMENTS = 'comments';
const WORKLOG = 'worklog';
const VOTE = 'vote';

// ----- action functions -----
const fetchTicketPromise = (method, location, data, getState) => {
    const state = getState();
    const { authToken } = state.auth;
    const { _id: ticketId } = state.ticket;

    let DataObj = typeof data === 'string' ? { data } : data;

    const headers = { Authorization: `Bearer ${authToken}` };

    if (!DataObj.isFormData) {
        headers['Content-Type'] = 'application/json';
        DataObj = JSON.stringify(DataObj);
    }

    return (
        fetch(`${API_BASE_URL}/tickets/${ticketId}/${location}`, {
            method: method,
            headers: headers,
            body: DataObj
        })
    )
    .then(res => normalizeResponseErrors(res))
    .then(res => {
        if (res.status === 204) {
            return { status: res.status, message: res.statusText };
        }
        return res.json();
    });
};

export const loadTicket = (ticketId) => (dispatch, getState) => {
    const tickets = getState().protectedData.tickets;
    if (tickets !== undefined) {
        const ticket = tickets.filter(t => t.ticketId === ticketId);
        ticket.length > 0 ? dispatch(loadedTicket(ticket)) : dispatch(loadTicketError());
    } else {
        dispatch(loadTicketError());
        dispatch(getTickets());
    }
};

export const postWorkLog = (formValues) => (dispatch, getState) => {
    dispatch(postWorkLogRequest());
    fetchTicketPromise(POST, WORKLOG, formValues, getState)
    .then(worklog => dispatch(postWorkLogSuccess(worklog.worklog)))
    .catch(error => dispatch(postWorkLogError(error)));
};

export const removeWorkLog = (formValues) => (dispatch, getState) => {
    dispatch(removeWorkLogRequest());
    const worklog = { worklogId: formValues };
    fetchTicketPromise(DELETE, WORKLOG, worklog, getState)
    .then(worklog => { console.log(worklog); dispatch(removeWorkLogSuccess(worklog.worklog)); })
    .catch(error => dispatch(removeWorkLogError(error)));
};

export const postComment = (formValues) => (dispatch, getState) => {
    dispatch(postCommentRequest());
    return fetchTicketPromise(POST, COMMENTS, formValues, getState)
    .then(comments => dispatch(postCommentSuccess(comments.comments)))
    .catch(error => dispatch(postCommentError(error)));
};

export const removeComment = (formValues) => (dispatch, getState) => {
    dispatch(removeCommentRequest());
    const comment = { commentId: formValues };
    fetchTicketPromise(DELETE, COMMENTS, comment, getState)
    .then(comments => dispatch(removeCommentSuccess(comments.comments)))
    .catch(error => dispatch(removeCommentError(error)));
};

export const updateInfo = (formValues) => (dispatch, getState) => {
    dispatch(updateInfoRequest());
    fetchTicketPromise(PUT, INFO, formValues, getState)
    .then(ticketInfo => dispatch(updateInfoSuccess(ticketInfo.ticketInfo)))
    .catch(error => dispatch(updateInfoError(error)));
};

export const updateDescription = (formValues) => (dispatch, getState) => {
    dispatch(updateDescriptionRequest());
    fetchTicketPromise(PUT, DESCRIPTION, formValues, getState)
    .then(description => dispatch(updateDescriptionSuccess(description.description)))
    .catch(error => dispatch(updateDescriptionError(error)));
};

export const voteTicket = () => (dispatch, getState) => {
    dispatch(voteTicketRequest());
    fetchTicketPromise(POST, VOTE, {}, getState)
    .then(res => dispatch(voteTicketSuccess(res.votes)))
    .catch(error => dispatch(voteTicketError(error)));
};
