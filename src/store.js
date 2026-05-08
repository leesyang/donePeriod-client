import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth';
import ticketReducer from './modules/ticket';
import protectedDataReducer from './modules/ticketsData';
import usersReducer from './modules/users';
import { loadAuthToken } from './utils/auth';
import { setAuthFromJwT } from './modules/auth';

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        protectedData: protectedDataReducer,
        ticket: ticketReducer,
    },
});

const authToken = loadAuthToken();
if (authToken) store.dispatch(setAuthFromJwT(authToken));

export default store;
