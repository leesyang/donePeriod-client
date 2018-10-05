import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// ----- redux -----
import { Provider } from 'react-redux';
import store from './store'

// ----- css -----
import 'normalize.css';
import './index.css';
import './components/containers/MainGrid.css';

// ----- components -----
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// ----- render -----
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();