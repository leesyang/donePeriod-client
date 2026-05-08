// ----- imports -----
import { createSlice } from '@reduxjs/toolkit';
import { normalizeResponseErrors } from '../utils/errors';
import { API_BASE_URL } from '../config';
import jwtDecode from 'jwt-decode';
import { saveAuthToken, clearAuthToken, getNewestNote } from '../utils/auth';

// ----- constants -----
export const GET = 'GET';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const POST = 'POST';

// ----- initialState -----
export const authStateInitial = {
    authToken: null,
    currentUser: null,
    loading: false,
    error: null,
    logIn: false,
    signUp: false,
};

// ----- slice -----
const authSlice = createSlice({
    name: 'auth',
    initialState: authStateInitial,
    reducers: {
        setAuthToken(state, action) {
            state.authToken = action.payload;
        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        clearAuth() {
            return { ...authStateInitial };
        },
        authRequest(state) {
            state.loading = true;
            state.error = null;
        },
        authSuccess(state, action) {
            state.loading = false;
            state.currentUser = action.payload;
        },
        authError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        watchTicketRequest(state) {
            state.currentUser = { ...state.currentUser, watchloading: true };
        },
        watchTicketSuccess(state, action) {
            state.currentUser = { ...state.currentUser, watchloading: false, watching: action.payload };
        },
        watchTicketError(state, action) {
            state.currentUser = { ...state.currentUser, error: true, errorInfo: action.payload, watchloading: false };
        },
        noteAdding(state, action) {
            state.currentUser = { ...state.currentUser, noteadding: action.payload };
        },
        addNoteRequest(state) {
            state.currentUser = { ...state.currentUser, noteloading: true };
        },
        addNoteSuccess(state, action) {
            state.currentUser = {
                ...state.currentUser,
                noteloading: false,
                noteadding: false,
                notes: [...state.currentUser.notes, action.payload],
            };
        },
        addNoteError(state, action) {
            state.currentUser = { ...state.currentUser, noteloading: false, error: true, errorInfo: action.payload };
        },
        updateUserPhoto(state, action) {
            state.currentUser = { ...state.currentUser, isEditing: action.payload };
        },
        updateUserPhotoRequest(state) {
            state.currentUser = { ...state.currentUser, photoUpdateLoading: true };
        },
        updateUserPhotoSuccess(state, action) {
            state.currentUser = { ...state.currentUser, photoUpdateLoading: false, isEditing: false, profilePicture: action.payload };
        },
        updateUserPhotoError(state, action) {
            state.currentUser = { ...state.currentUser, photoUpdateLoading: false, error: true, errorInfo: action.payload };
        },
        removeNoteSuccess(state, action) {
            const _notes = state.currentUser.notes.filter(note => !(note._id === action.payload));
            state.currentUser = { ...state.currentUser, noteloading: false, noteadding: false, notes: _notes };
        },
        toggleLogin(state, action) {
            state.logIn = action.payload;
            state.signUp = false;
        },
        toggleSignup(state, action) {
            state.signUp = action.payload;
            state.logIn = false;
        },
    },
});

export const {
    setAuthToken,
    setCurrentUser,
    clearAuth,
    authRequest,
    authSuccess,
    authError,
    watchTicketRequest,
    watchTicketSuccess,
    watchTicketError,
    noteAdding,
    addNoteRequest,
    addNoteSuccess,
    addNoteError,
    updateUserPhoto,
    updateUserPhotoRequest,
    updateUserPhotoSuccess,
    updateUserPhotoError,
    removeNoteSuccess,
    toggleLogin,
    toggleSignup,
} = authSlice.actions;

export default authSlice.reducer;

// ----- successful auth handler -----
export const storeAuthInfo = (authToken, dispatch) => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user));
    saveAuthToken(authToken);
};

export const setAuthFromJwT = (authToken) => dispatch => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(getUser(decodedToken.user.id));
};

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
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
        .catch(err => {
            dispatch(authError(err));
            throw err;
        })
    );
};

export const logout = () => dispatch => {
    clearAuthToken();
    dispatch(clearAuth());
};

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
    .then(currentUser => dispatch(setCurrentUser(currentUser)));
};

// -- const strings ---
const WATCH = 'watches';
const NOTE = 'notes';

export const fetchUserPromise = (method, location, data, getState) => {
    const { authToken, currentUser } = getState().auth;
    const userId = currentUser.id;

    let DataObj = typeof data === 'string' ? { data } : data;

    const headers = { Authorization: `Bearer ${authToken}` };

    if (!DataObj.isFormData) {
        headers['Content-Type'] = 'application/json';
        DataObj = JSON.stringify(DataObj);
    }

    return (
        fetch(`${API_BASE_URL}/users/${userId}/${location ? location : ""}`, {
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

export const watchTicket = (ticket_Id) => (dispatch, getState) => {
    dispatch(watchTicketRequest());
    fetchUserPromise(POST, WATCH, ticket_Id, getState)
    .then(tickets => dispatch(watchTicketSuccess(tickets)))
    .catch(err => {
        dispatch(watchTicketError(err));
    });
};

export const unwatchTicket = (ticket_Id) => (dispatch, getState) => {
    dispatch(watchTicketRequest());
    fetchUserPromise(DELETE, WATCH, ticket_Id, getState)
    .then(tickets => dispatch(watchTicketSuccess(tickets)))
    .catch(error => {
        dispatch(watchTicketError(error));
    });
};

export const addNote = (note) => (dispatch, getState) => {
    dispatch(addNoteRequest());
    fetchUserPromise(POST, NOTE, note, getState)
    .then(res => dispatch(addNoteSuccess(getNewestNote(res.notes))))
    .catch(err => {
        dispatch(addNoteError(err));
    });
};

export const deleteNote = (noteId) => (dispatch, getState) => {
    fetchUserPromise(DELETE, NOTE, { noteId }, getState)
    .then(res => {
        if (res.status === 204) {
            dispatch(removeNoteSuccess(noteId));
        }
    })
    .catch(error => {
        dispatch(authError(error));
    });
};

export const uploadProfilePicture = (profilePicture) => (dispatch, getState) => {
    dispatch(updateUserPhotoRequest());
    fetchUserPromise(PUT, null, profilePicture, getState)
    .then(res => dispatch(updateUserPhotoSuccess(res.profilePicture)))
    .catch(error => console.log(error));
};
