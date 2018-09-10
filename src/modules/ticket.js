// ----- ticket module -----
import { temp_data } from './ticketTempData';

// ----- actions -----
export const SET_EDIT_TICKET_MODE = 'app/ticket/SET_EDIT_TICKET_MODE';

export const UPDATE_INFO_REQUEST = 'app/ticket/UPDATE_INFO_REQUEST';
export const UPDATE_INFO_SUCCESS = 'app/ticket/UPDATE_INFO_SUCCESS';
export const UPDATE_INFO_ERROR = 'app/ticket/UPDATE_INFO_ERROR';

export const UPDATE_DESCRIPTION_REQUEST = 'app/ticket/UPDATE_DESCRIPTION_REQUEST';
export const UPDATE_DESCRIPTION_SUCCESS = 'app/ticket/UPDATE_DESCRIPTION_SUCCESS';
export const UPDATE_DESCRIPTION_ERROR = 'app/ticket/UPDATE_DESCRIPTION_ERROR'

export const UPDATE_ATTACHMENTS_REQUEST = 'app/ticket/UPDATE_ATTACHMENTS_REQUEST';
export const UPDATE_ATTACHMENTS_SUCCESS = 'app/ticket/UPDATE_ATTACHMENTS_SUCCESS';
export const UPDATE_ATTACHMENTS_ERROR = 'app/ticket/UPDATE_ATTACHMENTS_ERROR';

export const UPDATE_ACTIVITY_REQUEST = 'app/ticket/UPDATE_ACTIVITY_REQUEST';
export const UPDATE_ACTIVITY_SUCCESS = 'app/ticket/UPDATE_ACTIVITY_SUCCESS';
export const UPDATE_ACTIVITY_ERROR = 'app/ticket/UPDATE_ACTIVITY_ERROR';

// ----- reducer -----
export default function ticketReducer (state=temp_data, action) {
    if(action.type === SET_EDIT_TICKET_MODE ) {
        return Object.assign({}, state, { meta: { ...state.ticketInfo, isEditing: true } })
    }
    // ticket info
    if(action.type === UPDATE_INFO_REQUEST) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, isEditing: true} })
    }
    if(action.type === UPDATE_INFO_SUCCESS) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, isEditing: false }})
    }
    if(action.type === UPDATE_INFO_ERROR) {
        return Object.assign({}, state, { ticketInfo: { ...state.ticketInfo, isEditing: false }})
    }
    return state
}

// ----- action creators -----
// -- update info --
export const updateInfo = () => (
    { type: UPDATE_INFO_SUCCESS }
)
export const updateInfoRequest = () => (
    { type: UPDATE_INFO_REQUEST }
)
export const updateInfoSubmit = () => (
    { type: UPDATE_INFO_REQUEST }
)
export const setEditTicketMOde = () => (
    { type: SET_EDIT_TICKET_MODE }
)

// ----- action functions -----


// async update to ticket --> on success --> incorporate into tickets state
// 