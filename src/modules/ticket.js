// ----- ticket module -----
import { temp_data } from './ticketTempData';
import store from '../store';
import { checkTickets } from '../utils/tickets';
import { getTickets } from './ticketsData';

// ----- constants -----
import { GET, PUT, DELETE, POST } from './auth';
import { API_BASE_URL } from '../config';

// ----- utils -----
import { normalizeResponseErrors } from '../utils/errors';

// ----- actions -----
export const LOAD_TICKET = 'app/ticket/LOAD_TICKET';
export const LOAD_TICKET_ERROR = 'app/ticket/LOAD_TICKET_ERROR'

export const UPDATE_INFO = 'app/ticket/INIT_UPDATE_INFO';
export const UPDATE_INFO_REQUEST = 'app/ticket/UPDATE_INFO_REQUEST';
export const UPDATE_INFO_SUCCESS = 'app/ticket/UPDATE_INFO_SUCCESS';
export const UPDATE_INFO_ERROR = 'app/ticket/UPDATE_INFO_ERROR';

export const INIT_UPDATE_DESCRIPTION = 'app/ticket/INIT_UPDATE_DESCRIPTION';
export const UPDATE_DESCRIPTION_REQUEST = 'app/ticket/UPDATE_DESCRIPTION_REQUEST';
export const UPDATE_DESCRIPTION_SUCCESS = 'app/ticket/UPDATE_DESCRIPTION_SUCCESS';
export const UPDATE_DESCRIPTION_ERROR = 'app/ticket/UPDATE_DESCRIPTION_ERROR'

export const INIT_UPLOAD_ATTACHMENT = 'app/ticket/INIT_UPLOAD_ATTACHMENT';
export const UPLOAD_ATTACHMENT_REQUEST = 'app/ticket/UPLOAD_ATTACHMENT_REQUEST';
export const UPLOAD_ATTACHMENT_SUCCESS = 'app/ticket/UPLOAD_ATTACHMENT_SUCCESS';
export const UPLOAD_ATTACHMENT_ERROR = 'app/ticket/UPLOAD_ATTACHMENT_ERROR';

export const UPDATE_ACTIVITY_REQUEST = 'app/ticket/UPDATE_ACTIVITY_REQUEST';
export const UPDATE_ACTIVITY_SUCCESS = 'app/ticket/UPDATE_ACTIVITY_SUCCESS';
export const UPDATE_ACTIVITY_ERROR = 'app/ticket/UPDATE_ACTIVITY_ERROR';

export const POST_COMMENT_REQUEST = 'app/ticket/POST_COMMENT_REQUEST';
export const POST_COMMENT_SUCCESS = 'app/ticket/POST_COMMENT_SUCCESS';
export const POST_COMMENT_ERROR = 'app/ticket/POST_COMMENT_ERROR';

export const POST_WORKLOG_REQUEST = 'app/ticket/POST_WORKLOG_REQUEST';
export const POST_WORKLOG_SUCCESS = 'app/ticket/POST_WORKLOG_SUCCESS';
export const POST_WORKLOG_ERROR  = 'app/ticket/POST_WORKLOG_ERROR';

export const VOTE_TICKET_REQUEST = 'app/ticket/VOTE_TICKET_REQUEST';
export const VOTE_TICKET_SUCCESS = 'app/ticket/VOTE_TICKET_SUCCESS';
export const VOTE_TICKET_ERROR = 'app/ticket/VOTE_TICKET_ERROR';

// ----- reducer -----
export default function ticketReducer (state={}, action) {
    if(action.type === LOAD_TICKET){
        let ticketObject = action.state[0];
        return Object.assign({}, ticketObject, { isLoaded: true, isModified: false, error: false, errorInfo: null })
    }
    if(action.type === LOAD_TICKET_ERROR){
        return Object.assign({}, state, { isLoaded: false, error: true })
    }

    // ticket info
    if(action.type === UPDATE_INFO) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, isEditing: action.data } })
    }
    if(action.type === UPDATE_INFO_REQUEST) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, isUpdating: true} })
    }
    if(action.type === UPDATE_INFO_SUCCESS) {
        console.log(action.ticketInfo)
        return Object.assign({}, state, { ticketInfo: { ...action.ticketInfo, isEditing: false, isUpdating: false }, isModified: true })
    }
    if(action.type === UPDATE_INFO_ERROR) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, isEditing: false, error: true, errorInfo: action.error }})
    }

    // ticket description
    if(action.type === INIT_UPDATE_DESCRIPTION) {
        return Object.assign({}, state, { description: {...state.description, isEditing: true }})
    }
    if(action.type === UPDATE_DESCRIPTION_REQUEST) {
        return Object.assign({}, state, { description: { ...state.description, isUpdating: true } })
    }
    if(action.type === UPDATE_DESCRIPTION_SUCCESS) {
        console.log(action.description.text)
        return Object.assign({}, state, { description: { ...state.description, text: action.description.text, isEditing: false, isUpdating: false }, isModified: true})
    }
    if(action.type === UPDATE_ACTIVITY_ERROR) {
        return Object.assign({}, state, { description: {...state.description, isEditing: false, error: true, errorInfo: action.error}})
    }


    // vote ticket
    if(action.type === VOTE_TICKET_REQUEST) {
        return Object.assign({}, state, { voteloading: true })
    }
    if(action.type === VOTE_TICKET_SUCCESS) {
        return Object.assign({}, state, { voteloading: false, votes: action.votes, isModified: true })
    }
    if(action.type === VOTE_TICKET_ERROR) {
        return Object.assign({}, state, { voteloading: false, error: action.error })
    }
    // ticket comments

    return state
}

// ----- action creators -----

// -- load ticket --
export const loadedTicket = (ticket) => (
    {type: LOAD_TICKET, state: ticket}
)
export const loadTicketError = () => (
    { type: LOAD_TICKET_ERROR }
)

export const loadTicket = (ticketId) => dispatch => {
    if(checkTickets()) {
        let currentState = store.getState();
        let ticket = currentState.protectedData.tickets.filter(ticket => ticket.ticketId === ticketId)
        ticket.length > 0? dispatch(loadedTicket(ticket)) : dispatch(loadTicketError)
    }
    else {
        dispatch(loadTicketError);
        dispatch(getTickets());
    }

}

// -- update info --
export const updateInfoInit = (boolean) => (
    { type: UPDATE_INFO, data: boolean }
)
export const updateInfoRequest = () => (
    { type: UPDATE_INFO_REQUEST }
)
export const updateInfoSuccess = (data) => (
    { type: UPDATE_INFO_SUCCESS, ticketInfo: data.ticketInfo }
)
export const updateInfoError = (error) => (
    { type: UPDATE_INFO_ERROR, error: error }
)

// -- update descritipn --
export const updateDescriptionInit = () => (
    { type: INIT_UPDATE_DESCRIPTION }
)
export const updateDescriptionRequest = () => (
    { type: UPDATE_DESCRIPTION_REQUEST }
)
export const updateDescriptionSuccess = (data) => (
    { type: UPDATE_DESCRIPTION_SUCCESS, description: data.description }
)
export const updateDescriptionError = (error) => (
    { type: UPDATE_ACTIVITY_ERROR, error: error}
)

// -- vote a ticket --
export const voteTicketRequest = () => (
    { type: VOTE_TICKET_REQUEST }
)
export const voteTicketSuccess = (data) => (
    { type: VOTE_TICKET_SUCCESS, votes: data.votes}
)
export const voteTicketError = (error) => (
    { type: VOTE_TICKET_ERROR, error: error}
)
// -- uploading attachments --

// -- location endpoints --
const DESCRIPTION = 'description';
const INFO = 'info';
const ATTACHMENTS = 'attachments';
const COMMENTS = 'comments';
const WORKLOG = 'worklog';
const VOTE = 'vote';

// ----- action functions -----
const fetchTicketPromise = (method, location, data, getState) => {
    const state = getState();
    const { authToken } = state.auth;
    const { _id: ticketId } = state.ticket;

    let DataObj;
    typeof data === 'string'? DataObj = { data } : DataObj = data;
    console.log('fetch ticket promise')

    return (
        fetch(`${API_BASE_URL}/tickets/${ticketId}/${location}`, {
            method: method,
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: DataObj? JSON.stringify(DataObj) : null
        })
    )
    .then(res => normalizeResponseErrors(res))
    .then(res => {
        if(res.status === 204){
            return { status: res.status, message: res.statusText }
        }
        return res.json()
    })
}

export const updateInfo = (formValues) => (dispatch, getState) => {
    dispatch(updateInfoRequest());
    fetchTicketPromise(PUT, INFO, formValues, getState)
    .then(ticketInfo => dispatch(updateInfoSuccess(ticketInfo)))
    .catch(error => dispatch(updateInfoError(error)))
}

export const updateDescription = (formValues) => (dispatch, getState) => {
    dispatch(updateDescriptionRequest());
    fetchTicketPromise(PUT, DESCRIPTION, formValues, getState )
    .then(description => {
        dispatch(updateDescriptionSuccess(description))
    })
    .catch(error => dispatch(updateDescriptionError(error)))
}

export const voteTicket = () => (dispatch, getState) => {
    dispatch(voteTicketRequest());
    fetchTicketPromise(POST, VOTE, null, getState)
    .then(res => dispatch(voteTicketSuccess(res)))
    .catch(error => dispatch(voteTicketError(error)))
}