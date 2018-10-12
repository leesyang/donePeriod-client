// ----- ticket module -----
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
export const LOAD_TICKET_ERROR = 'app/ticket/LOAD_TICKET_ERROR';
export const CLEAR_TICKET = 'app/ticket/CLEAR_TICKET';

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

export const REMOVE_COMMENT_REQUEST = 'app/ticket/REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'app/ticket/REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_ERROR = 'app/ticket/REMOVE_COMMENT_ERROR';

export const POST_WORKLOG_REQUEST = 'app/ticket/POST_WORKLOG_REQUEST';
export const POST_WORKLOG_SUCCESS = 'app/ticket/POST_WORKLOG_SUCCESS';
export const POST_WORKLOG_ERROR  = 'app/ticket/POST_WORKLOG_ERROR';

export const REMOVE_WORKLOG_REQUEST = 'app/ticket/REMOVE_WORKLOG_REQUEST';
export const REMOVE_WORKLOG_SUCCESS = 'app/ticket/REMOVE_WORKLOG_SUCCESS';
export const REMOVE_WORKLOG_ERROR  = 'app/ticket/REMOVE_WORKLOG_ERROR';

export const VOTE_TICKET_REQUEST = 'app/ticket/VOTE_TICKET_REQUEST';
export const VOTE_TICKET_SUCCESS = 'app/ticket/VOTE_TICKET_SUCCESS';
export const VOTE_TICKET_ERROR = 'app/ticket/VOTE_TICKET_ERROR';

export const CHANGE_ACT_VIEW = 'app/ticket/CHANGE_ACT_VIEW';

const trInitialState = {};

// ----- reducer -----
export default function ticketReducer (state=trInitialState, action) {
    // load ticket from ticket data
    if(action.type === LOAD_TICKET){
        let ticketObject = action.state[0];
        return Object.assign({}, ticketObject, { isLoaded: true, isModified: false, error: false, errorInfo: null, activityView: 'comments' })
    }
    if(action.type === LOAD_TICKET_ERROR){
        return Object.assign({}, state, { isLoaded: false, error: true })
    }

    // clear ticket data from reducer
    if(action.type === CLEAR_TICKET) {
        return Object.assign({}, trInitialState);
    }

    // ticket info
    if(action.type === UPDATE_INFO) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, isEditing: action.data } })
    }
    if(action.type === UPDATE_INFO_REQUEST) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, isUpdating: true} })
    }
    if(action.type === UPDATE_INFO_SUCCESS) {

        return Object.assign({}, state, { ticketInfo: { ...action.ticketInfo, isEditing: false, isUpdating: false }, isModified: true })
    }
    if(action.type === UPDATE_INFO_ERROR) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, isEditing: false, error: true, errorInfo: action.error }})
    }

    // ticket description
    if(action.type === INIT_UPDATE_DESCRIPTION) {
        return Object.assign({}, state, { description: {...state.description, isEditing: action.data }})
    }
    if(action.type === UPDATE_DESCRIPTION_REQUEST) {
        return Object.assign({}, state, { description: { ...state.description, isUpdating: true } })
    }
    if(action.type === UPDATE_DESCRIPTION_SUCCESS) {
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

    // add ticket comment
    if(action.type === POST_COMMENT_REQUEST) {
        return Object.assign({}, state, { commentsloading: true })
    }
    if(action.type === POST_COMMENT_SUCCESS) {
        return Object.assign({}, state, { commentsloading: false, comments: action.comments, isModified: true })
    }
    if(action.type === POST_COMMENT_ERROR) {
        return Object.assign({}, state, { commentsloading: false, error: action.error })
    }

        // add ticket comment
    if(action.type === POST_COMMENT_REQUEST) {
        return Object.assign({}, state, { commentsloading: true })
    }
    if(action.type === POST_COMMENT_SUCCESS) {
        return Object.assign({}, state, { commentsloading: false, comments: action.comments, isModified: true })
    }
    if(action.type === POST_COMMENT_ERROR) {
        return Object.assign({}, state, { commentsloading: false, error: action.error })
    }

    // remove ticket comment
    if(action.type === REMOVE_COMMENT_REQUEST) {
        return Object.assign({}, state, { commentsloading: true })
    }
    if(action.type === REMOVE_COMMENT_SUCCESS) {
        return Object.assign({}, state, { commentsloading: false, comments: action.comments, isModified: true })
    }
    if(action.type === REMOVE_COMMENT_ERROR) {
        return Object.assign({}, state, { commentsloading: false, error: action.error })
    }

    // post work log
    if(action.type === POST_WORKLOG_REQUEST) {
        return Object.assign({}, state, { workloguploading: true })
    }
    if(action.type === POST_WORKLOG_SUCCESS) {
        return Object.assign({}, state, { workloguploading: false, worklog: action.worklog, isModified: true })
    }
    if(action.type === POST_WORKLOG_ERROR) {
        return Object.assign({}, state, { workloguploading: false, error: action.error })
    }

    // remove work log
    if(action.type === REMOVE_WORKLOG_REQUEST) {
        return Object.assign({}, state, { workloguploading: true })
    }
    if(action.type === REMOVE_WORKLOG_SUCCESS) {
        return Object.assign({}, state, { workloguploading: false, worklog: action.worklog, isModified: true })
    }
    if(action.type === REMOVE_WORKLOG_ERROR) {
        return Object.assign({}, state, { workloguploading: false, error: action.error })
    }

    // change activity view
    if(action.type === CHANGE_ACT_VIEW) {
        return Object.assign({}, state, { activityView: action.data })
    }

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
export const updateInfoSuccess = (data) => {
    return { type: UPDATE_INFO_SUCCESS, ticketInfo: data.ticketInfo }
}
export const updateInfoError = (error) => (
    { type: UPDATE_INFO_ERROR, error: error }
)

// -- update descritipn --
export const updateDescriptionInit = (boolean) => (
    { type: INIT_UPDATE_DESCRIPTION, data: boolean }
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

// -- post comment --
export const postCommentRequest = () => (
    { type: POST_COMMENT_REQUEST }
)
export const postCommentSuccess = (data) => (
    { type: POST_COMMENT_SUCCESS, comments: data.comments }
)
export const postCommentError = (error) => (
    { type: POST_COMMENT_ERROR, error: error }
)

// -- remove comment --
export const removeCommentRequest = () => (
    { type: POST_COMMENT_REQUEST }
)
export const removeCommentSuccess = (data) => (
    { type: POST_COMMENT_SUCCESS, comments: data.comments }
)
export const removeCommentError = (error) => (
    { type: POST_COMMENT_ERROR, error: error }
)

// -- post worklog --
export const postWorkLogRequest = () => (
    { type: POST_WORKLOG_REQUEST }
)
export const postWorkLogSuccess = (data) => (
    { type: POST_WORKLOG_SUCCESS, worklog: data.worklog }
)
export const postWorkLogError = (error) => (
    { type: POST_WORKLOG_ERROR, error: error }
)

// -- remove worklog --
export const removeWorkLogRequest = () => (
    { type: REMOVE_WORKLOG_REQUEST }
)
export const removeWorkLogSuccess = (data) => (
    { type: REMOVE_WORKLOG_SUCCESS, worklog: data.worklog }
)
export const removeWorkLogError = (error) => (
    { type: REMOVE_WORKLOG_ERROR, error: error }
)

// -- change act view --
export const changeActView = (view) => (
    { type: CHANGE_ACT_VIEW, data: view }
)

// -- clear ticket --
export const clearTicket = () => (
    { type: CLEAR_TICKET }
)

// -- location endpoints --
const DESCRIPTION = 'description';
const INFO = 'info';
const ATTACHMENTS = 'attachments';
const COMMENTS = 'comments';
const WORKLOG = 'worklog';
const VOTE = 'vote';

// ----- action functions -----
const fetchTicketPromise = (method, location, data) => {
    const state = store.getState();
    const { authToken } = state.auth;
    const { _id: ticketId } = state.ticket;

    let DataObj = typeof data === 'string'? { data } : data;

    const headers = { Authorization: `Bearer ${authToken}` }

    if(!DataObj.isFormData) {
        headers['Content-Type'] = 'application/json'
        DataObj = JSON.stringify(DataObj)
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
        if(res.status === 204){
            return { status: res.status, message: res.statusText }
        }
        return res.json()
    })
}

export const postWorkLog = (formValues) => dispatch => {
    dispatch(postWorkLogRequest());
    fetchTicketPromise(POST, WORKLOG, formValues)
    .then(worklog => dispatch(postWorkLogSuccess(worklog)))
    .catch(error => dispatch(postWorkLogError(error)))
}

export const removeWorkLog = (formValues) => dispatch => {
    dispatch(removeWorkLogRequest());
    const worklog = { worklogId: formValues }
    fetchTicketPromise(DELETE, WORKLOG, worklog)
    .then(worklog => {console.log(worklog); dispatch(removeWorkLogSuccess(worklog))})
    .catch(error => dispatch(removeWorkLogError(error)))
}

export const postComment = (formValues) => dispatch => {
    dispatch(postCommentRequest());
    return fetchTicketPromise(POST, COMMENTS, formValues)
    .then(comments => dispatch(postCommentSuccess(comments)))
    .catch(error => dispatch(postCommentError(error)))
}

export const removeComment = (formValues) => dispatch => {
    dispatch(removeCommentRequest());
    const comment = { commentId: formValues }
    fetchTicketPromise(DELETE, COMMENTS, comment)
    .then(comments => dispatch(removeCommentSuccess(comments)))
    .catch(error => dispatch(removeCommentError(error)))
}

export const updateInfo = (formValues) => dispatch => {
    dispatch(updateInfoRequest());
    fetchTicketPromise(PUT, INFO, formValues)
    .then(ticketInfo => dispatch(updateInfoSuccess(ticketInfo)))
    .catch(error => dispatch(updateInfoError(error)))
}

export const updateDescription = (formValues) => dispatch => {
    dispatch(updateDescriptionRequest());
    fetchTicketPromise(PUT, DESCRIPTION, formValues )
    .then(description => {
        dispatch(updateDescriptionSuccess(description))
    })
    .catch(error => dispatch(updateDescriptionError(error)))
}

export const voteTicket = () => dispatch => {
    dispatch(voteTicketRequest());
    fetchTicketPromise(POST, VOTE, {})
    .then(res => dispatch(voteTicketSuccess(res)))
    .catch(error => dispatch(voteTicketError(error)))
}