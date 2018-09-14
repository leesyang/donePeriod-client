import { createStore, combineReducers, applyMiddleware } from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken } from './utils/auth';

// ----- import reducers -----
import authReducer from './modules/auth';
import ticketReducer from './modules/ticket';
import protectedDataReducer from './modules/ticketsData';

// ----- import actions -----
import { setAuthFromJwT } from './modules/auth';

// ----- create store -----
const store = createStore(
    combineReducers({
        auth: authReducer,
        form: formReducer,
        protectedData: protectedDataReducer,
        ticket: ticketReducer
    }),
    applyMiddleware(thunk)
);

//console.log(store.getState());

// ----- load authToken from local storage -----
let authToken = loadAuthToken();
if (authToken) {
    let token = authToken;
    store.dispatch(setAuthFromJwT(token));
}

export default store