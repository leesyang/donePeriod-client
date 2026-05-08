import React from 'react';
import { createRoot } from 'react-dom/client';

// ----- redux -----
import { Provider } from 'react-redux';
import store from './store';

// ----- css -----
import 'normalize.css';
import './index.css';
import './components/containers/MainGrid.css';

// ----- components -----
import App from './App';

// ----- render -----
const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
