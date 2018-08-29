// ----- ticket module -----
import { temp_data } from './ticketTempData';

// ----- actions -----

export const UPDATE_INFO = 'app/ticket/UPDATE_INFO';
export const UPDATE_DESCRIPTION = 'app/ticket/UPDATE_DESCRIPTION';
export const UPDATE_ATTACHMENTS = 'app/ticket/UPDATE_ATTACHMENTS';
export const UPDATE_ACTIVITY = 'app/ticket/UPDATE_ACTIVITY';

// ----- reducer -----
export default function ticketReducer (state=temp_data, action) {
    if(action.type === UPDATE_INFO) {
        return Object.assign({}, state, {})
    }
    return state
}

// ----- action creators -----
export const updateInfo = (ticketInfo) => (
    { type: UPDATE_INFO, ticketInfo: ticketInfo }
)

// include a meta key in the ticket to track how the data is being displayed or interacted with