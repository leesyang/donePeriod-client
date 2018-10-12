import { createStore, combineReducers, applyMiddleware } from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken } from './utils/auth';

// ----- import reducers -----
import authReducer from './modules/auth';
import ticketReducer from './modules/ticket';
import protectedDataReducer from './modules/ticketsData';
import usersReducer from './modules/users';

// ----- import actions -----
import { setAuthFromJwT } from './modules/auth';

// ----- create store -----
const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        users: usersReducer,
        protectedData: protectedDataReducer,
        ticket: ticketReducer
    }),
    applyMiddleware(thunk)
);

// ----- load authToken from local storage -----
let authToken = loadAuthToken();
if (authToken) {
    let token = authToken;
    store.dispatch(setAuthFromJwT(token));
}

export default store