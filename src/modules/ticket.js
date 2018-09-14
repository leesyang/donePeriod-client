// ----- ticket module -----
import { temp_data } from './ticketTempData';
import store from '../store';
import { checkTickets } from '../utils/tickets';
import { getTickets } from './ticketsData';

// ----- actions -----
export const LOAD_TICKET = 'app/ticket/LOAD_TICKET';
export const LOAD_TICKET_ERROR = 'app/ticket/LOAD_TICKET_ERROR'

export const INIT_UPDATE_INFO = 'app/ticket/INIT_UPDATE_INFO';
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
export const POST_WORKLOG_ERROR  = 'app/ticket/POST_WORKLOG_ERROR'

const initialState = { isLoaded: false, error: false };

// ----- reducer -----
export default function ticketReducer (state=initialState, action) {
    if(action.type === LOAD_TICKET){
        let ticketObject = action.state[0];
        return Object.assign({}, ticketObject, { isLoaded: true })
    }
    if(action.type === LOAD_TICKET_ERROR){
        return Object.assign({}, state, { isLoaded: false, error: true })
    }

    // ticket info
    if(action.type === INIT_UPDATE_INFO) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, isEditing: true } })
    }
    if(action.type === UPDATE_INFO_REQUEST) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, isUpdating: true} })
    }
    if(action.type === UPDATE_INFO_SUCCESS) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, ...action.payload, isEditing: false, isUpdating: false }})
    }
    if(action.type === UPDATE_INFO_ERROR) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, isEditing: false, error: true }})
    }

    // ticket description
    if(action.type === INIT_UPDATE_DESCRIPTION) {
        return Object.assign({}, state, { description: {...state.description, isEditing: true }})
    }
    if(action.type === UPDATE_DESCRIPTION_REQUEST) {
        return Object.assign({}, state, { description: { ...state.description, isUpdating: true } })
    }
    if(action.type === UPDATE_DESCRIPTION_SUCCESS) {
        return Object.assign({}, state, { description: { ...state.description, text: action.text, isEditing: false, isUpdating: false }})
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
        console.log(ticket);
        if(ticket.length > 0) {
            dispatch(loadedTicket(ticket));
        }
        else {
            dispatch(loadTicketError);
        }
    }
    else {
        dispatch(loadTicketError);
        dispatch(getTickets());
    }

}

// -- update info --
export const updateInfoInit = () => (
    { type: INIT_UPDATE_INFO }
)
export const updateInfoRequest = () => (
    { type: UPDATE_INFO_REQUEST }
)
export const updateInfoSuccess = (newInfo) => (
    { type: UPDATE_INFO_SUCCESS, payload: newInfo }
)

// -- update descritipn --
export const updateDescriptionInit = () => (
    { type: INIT_UPDATE_DESCRIPTION }
)
export const updateDescriptionRequest = () => (
    { type: UPDATE_DESCRIPTION_REQUEST }
)
export const updateDescriptionSuccess = (description) => (
    { type: UPDATE_DESCRIPTION_SUCCESS, text: description }
)

// -- uploading attachments --


// ----- action functions -----
export const updateInfo = (formValues) => dispatch => {
    dispatch(updateInfoRequest());
    let newInfo = formValues;
    console.log(newInfo)
    setTimeout(() => dispatch(updateInfoSuccess(newInfo)), 2000)
}

export const updateDescription = (formValues ) => dispatch => {
    dispatch(updateDescriptionRequest());
    let description = formValues.description;
    setTimeout(() => dispatch(updateDescriptionSuccess(description)), 2000)
}

// async update to ticket --> on success --> incorporate into tickets state
// 