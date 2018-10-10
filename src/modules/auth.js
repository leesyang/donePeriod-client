// ----- imports -----
import { normalizeResponseErrors } from '../utils/errors';
import { API_BASE_URL } from '../config';
import jwtDecode from 'jwt-decode';
import { saveAuthToken, clearAuthToken, getNewestNote } from '../utils/auth';
import { SubmissionError } from 'redux-form';

// ----- actions -----
export const SET_AUTH_TOKEN = 'app/auth/SET_AUTH_TOKEN';
export const SET_CURRENT_USER = 'app/auth/SET_CURRENT_USER';
export const CLEAR_AUTH = 'app/auth/CLEAR_AUTH';

export const AUTH_REQUEST = 'app/auth/AUTH_REQUEST';
export const AUTH_SUCCESS = 'app/auth/AUTH_SUCCESS';
export const AUTH_ERROR = 'app/auth/AUTH_ERROR';

export const WATCH_TICKET_REQUEST = 'app/auth/WATCH_TICKET_REQUEST';
export const WATCH_TICKET_SUCCESS = 'app/auth/WATCH_TICKET_SUCCESS';
export const WATCH_TICKET_ERROR = 'app/auth/WATCH_TICKET_ERROR';

export const UNWATCH_TICKET_REQUEST = 'app/auth/WATCH_TICKET_REQUEST';
export const UNWATCH_TICKET_SUCCESS = 'app/auth/WATCH_TICKET_SUCCESS';
export const UNWATCH_TICKET_ERROR = 'app/auth/WATCH_TICKET_ERROR';

export const VOTE_TICKET_REQUEST = 'app/auth/VOTE_TICKET_REQUEST';
export const VOTE_TICKET_SUCCESS = 'app/auth/VOTE_TICKET_SUCCESS';
export const VOTE_TICKET_ERROR = 'app/auth/VOTE_TICKET_ERROR';

export const NOTE_ADDING = 'app/auth/NOTE_ADDING'
export const ADD_NOTE_REQUEST = 'app/auth/ADD_NOTE_REQUEST';
export const ADD_NOTE_SUCCESS = 'app/auth/ADD_NOTE_SUCCESS';
export const ADD_NOTE_ERROR = 'app/auth/ADD_NOTE_ERROR';

export const REMOVE_NOTE_SUCCESS = 'app/auth/REMOVE_NOTE_SUCCESS';
export const REMOVE_NOTE_ERROR = 'app/auth/REMOVE_NOTE_ERROR';

export const UPDATE_USER_PHOTO = 'app/auth/UPDATE_USER_PHOTO';
export const UPDATE_USER_PHOTO_REQUEST = 'app/auth/UPDATE_USER_PHOTO_REQUEST';
export const UPDATE_USER_PHOTO_SUCCESS = 'app/auth/UPDATE_USER_PHOTO_SUCCESS';
export const UPDATE_USER_PHOTO_ERROR = 'app/auth/UPDATE_USER_PHOTO_ERROR';

// ----- initialState -----
const initialState = {
    authToken: null,
    currentUser: null,
    loading: false,
    error: null,
}

// ----- reducer -----
export default function authReducer (state=initialState, action) {
    if(action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, { authToken: action.authToken } )
    }
    else if(action.type === SET_CURRENT_USER) {
        return Object.assign({}, state, { currentUser: action.currentUser })
    }
    else if(action.type === CLEAR_AUTH) {
        return Object.assign({}, initialState )
    }
    // auth request
    else if(action.type === AUTH_REQUEST) {
        return Object.assign({}, state, { loading: true, error: null })
    }
    else if(action.type === AUTH_SUCCESS) {
        return Object.assign({}, state, { loading: false, currentUser: action.currentUser })
    }
    else if(action.type === AUTH_ERROR) {
        return Object.assign({}, state, { loading: false, error: action.error })
    }
    // watch a ticket
    else if(action.type === WATCH_TICKET_REQUEST) {
        return Object.assign({}, state, { currentUser: {...state.currentUser, watchloading: true} })
    }
    else if(action.type === WATCH_TICKET_SUCCESS) {
        console.log(action.data);
        return Object.assign({}, state, { 
            currentUser: {... state.currentUser, 
                watchloading: false, 
                watching: action.data }
        })
    }
    else if(action.type === WATCH_TICKET_ERROR) {
        return Object.assign({}, state, { 
            currentUser: { ...state.currentUser, 
                error: true,
                errorInfo: action.error,
                watchloading: false } })
    }
    // un-watch a ticket
    else if(action.type === UNWATCH_TICKET_REQUEST) {
        return Object.assign({}, state, { currentUser: {...state.currentUser, unwatchloading: true} })
    }
    else if(action.type === UNWATCH_TICKET_SUCCESS) {
        console.log(action.data);
        return Object.assign({}, state, { 
            currentUser: {... state.currentUser, 
                unwatchloading: false, 
                watching: action.data }
        })
    }
    else if(action.type === UNWATCH_TICKET_ERROR) {
        return Object.assign({}, state, { 
            currentUser: { ...state.currentUser, 
                error: true,
                errorInfo: action.error,
                unwatchloading: false } })
    }

    // add note
    else if(action.type === NOTE_ADDING) {
        return Object.assign({}, state, { currentUser: {...state.currentUser, noteadding: action.boolean }})
    }
    else if(action.type === ADD_NOTE_REQUEST) {
        return Object.assign({}, state, { currentUser: {...state.currentUser, noteloading: true} })
    }
    else if(action.type === ADD_NOTE_SUCCESS) {
        return Object.assign({}, state, { 
            currentUser: {...state.currentUser, 
                noteloading: false,
                noteadding: false,
                notes: [ ...state.currentUser.notes, action.data] }})
    }
    else if(action.type === ADD_NOTE_ERROR) {
        return Object.assign({}, state, { currentUser: { ...state.currentUser, noteloading: false, error: true, errorInfo: action.error} })
    }

    // update user photo
    else if(action.type === UPDATE_USER_PHOTO) {
        return Object.assign({}, state, { currentUser: { ...state.currentUser, isEditing: action.data }})
    }
    else if(action.type === UPDATE_USER_PHOTO_REQUEST) {
        return Object.assign({}, state, { currentUser: { ...state.currentUser, photoUpdateLoading: true }})
    }
    else if(action.type === UPDATE_USER_PHOTO_SUCCESS) {
        return Object.assign({}, state, { currentUser: { ... state.currentUser, photoUpdateLoading: false, isEditing: false, profilePicture: action.data }})
    }
    else if(action.type === UPDATE_USER_PHOTO_ERROR) {
        return Object.assign({}, state, { currentUser: { ...state.currentUser, photoUpdateLoading: false, error: true, errorInfo: action.error }})
    }

    // remove note?
    else if(action.type === REMOVE_NOTE_SUCCESS){
        let _notes = state.currentUser.notes.filter(note => !(note._id === action.data))
        return Object.assign({}, state, {
            currentUser: {...state.currentUser,
                noteloading: false,
                noteadding: false,
                notes: _notes
        }})
    }
    return state;
}


// ----- action creators -----
export const setAuthToken = authToken => (
    { type: SET_AUTH_TOKEN, authToken }
)
export const setCurrentUser = currentUser => (
    { type: SET_CURRENT_USER, currentUser }
)
export const clearAuth = () => (
    { type: CLEAR_AUTH }
)

// auth request
export const authRequest = () => (
    { type: AUTH_REQUEST }
)
export const authSuccess = currentUser => (
    { type: AUTH_SUCCESS, currentUser }
)
export const authError = error => (
    { type: AUTH_ERROR, error }
)

// watch a ticket
export const watchTicketRequest = () => (
    { type: WATCH_TICKET_REQUEST }
)
export const watchTicketSuccess = (tickets) => (
    { type: WATCH_TICKET_SUCCESS, data: tickets }
)
export const watchTicketError = (error) => (
    { type: WATCH_TICKET_ERROR, error: error }
)

//unwatch a ticket
export const unwatchTicketRequest = () => (
    { type: UNWATCH_TICKET_REQUEST }
)
export const unwatchTicketSuccess = (tickets) => (
    { type: UNWATCH_TICKET_SUCCESS, data: tickets }
)
export const unwatchTicketError = (error) => (
    { type: UNWATCH_TICKET_ERROR, error: error }
)

// add a note
export const noteAdding = (boolean) => (
    { type: NOTE_ADDING, boolean: boolean }
)
export const addNoteRequest = () => (
    { type: ADD_NOTE_REQUEST }
)
export const addNoteSuccess = (note) => (
    { type: ADD_NOTE_SUCCESS, data: note }
)
export const addNoteError = (error) => (
    { type: ADD_NOTE_ERROR, error: error }
)

// remove a note
export const removeNoteSuccess = (noteId) => (
    { type: REMOVE_NOTE_SUCCESS, data: noteId }
)
export const removeNoteError = (error) => (
    { type: REMOVE_NOTE_ERROR, error: error }
)

// upload user picture
export const updateUserPhoto = (boolean) => (
    { type: UPDATE_USER_PHOTO, data: boolean }
)
export const updateUserPhotoRequest = () => (
    { type: UPDATE_USER_PHOTO_REQUEST }
)
export const updateUserPhotoSuccess = (link) => (
    { type: UPDATE_USER_PHOTO_SUCCESS, data: link}
)
export const updateUserPhotoError = (error) => (
    { type: UPDATE_USER_PHOTO_ERROR,  error: error }
)

// ----- successful auth handler -----
export const storeAuthInfo = (authToken, dispatch) => {
    const decodedToken = jwtDecode(authToken);
    console.log(decodedToken.user)
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user));
    saveAuthToken(authToken);
};

export const setAuthFromJwT = (authToken) => dispatch => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(getUser(decodedToken.user.id));
}

// ----- action functions -----
export const login = (username, password) => dispatch => {
    dispatch(authRequest());
    return (
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        // Reject any requests which don't return a 200 status, creating
        // errors which follow a consistent format
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({authToken}) => storeAuthInfo(authToken, dispatch))
        .catch(err => {
            dispatch(authError(err));
            const {reason, message, location} = err;
            if (reason === 'ValidationError' || 'LoginError') { 
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                   throw new SubmissionError({
                        [location]: message
                    })
            }
        })
    );
};

export const logout = () => dispatch => {
    clearAuthToken();
    dispatch(clearAuth());
}

export const getUser = (user_Id) => (dispatch, getState) => {
    const { authToken } = getState().auth;
    return (
        fetch(`${API_BASE_URL}/users/${user_Id}/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        })
    )
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(currentUser => dispatch(setCurrentUser(currentUser)))
}
// -- const strings ---
const WATCH = 'watches';
const NOTE = 'notes';
export const GET = 'GET';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const POST = 'POST';

export const fetchUserPromise = (method, location, data, getState) => {
    const { authToken, currentUser } = getState().auth;
    const userId = currentUser.id;

    let DataObj = typeof data === 'string'? { data } : data;

    const headers = { Authorization: `Bearer ${authToken}` }

    if(!DataObj.isFormData) {
        headers['Content-Type'] = 'application/json'
        DataObj = JSON.stringify(DataObj)
    }

    return (
        fetch(`${API_BASE_URL}/users/${userId}/${location? location: ""}`, {
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

export const watchTicket = (ticket_Id) => (dispatch, getState) => {
    dispatch(watchTicketRequest());
    fetchUserPromise(POST, WATCH, ticket_Id, getState )
    .then(tickets => dispatch(watchTicketSuccess(tickets)))
    .catch(err => {
        dispatch(watchTicketError(err));
    })
}

export const unwatchTicket = (ticket_Id) => (dispatch, getState) => {
    dispatch(unwatchTicketRequest());
    fetchUserPromise(DELETE, WATCH, ticket_Id, getState )
    .then(tickets => dispatch(unwatchTicketSuccess(tickets)))
    .catch(error => {
        dispatch(unwatchTicketError(error))
    })
}

export const addNote = (note) => (dispatch, getState) => {
    dispatch(addNoteRequest());
    fetchUserPromise(POST, NOTE, note, getState)
    .then(res => dispatch(addNoteSuccess(getNewestNote(res.notes))))
    .catch(err => {
        dispatch(addNoteError(err));
    })
}

export const deleteNote = (noteId) => (dispatch, getState) => {
    fetchUserPromise(DELETE, NOTE, { noteId }, getState)
    .then(res => {
        if(res.status === 204){
            dispatch(removeNoteSuccess(noteId));
        }
    })
    .catch(error => {
        dispatch(removeNoteError(error));
    })
}

export const uploadProfilePicture = (profilePicture) => (dispatch, getState) => {
    dispatch(updateUserPhotoRequest());
    fetchUserPromise(POST, null, profilePicture, getState)
    .then(res => dispatch(updateUserPhotoSuccess(res.profilePicture)))
    .catch(error => console.log(error))
}