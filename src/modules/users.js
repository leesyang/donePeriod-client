import { createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils/errors';
import { login } from '../modules/auth';

const urInitialState = {};

const usersSlice = createSlice({
    name: 'users',
    initialState: urInitialState,
    reducers: {
        getUsersRequest(state) {
            state.loading = true;
        },
        getUsersSuccess(state, action) {
            state.loading = false;
            state.all = action.payload;
        },
        getUsersError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearUsers() {
            return { ...urInitialState };
        },
    },
});

export const {
    getUsersRequest,
    getUsersSuccess,
    getUsersError,
    clearUsers,
} = usersSlice.actions;

export default usersSlice.reducer;

// ----- get list of users -----
export const getUsers = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(getUsersRequest());
    return fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(users => {
        dispatch(getUsersSuccess(users));
    })
    .catch(err => {
        dispatch(getUsersError(err));
    });
};

// -- register user and log in --
export const registerUser = user => dispatch => {
    let userInfo = user;
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => {
        dispatch(login(userInfo.username, userInfo.password));
        userInfo = {};
    })
    .catch(err => {
        throw err;
    });
};
