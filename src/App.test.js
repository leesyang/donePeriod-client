import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore } from './test-utils';
import App from './App';

describe('<App />', () => {
    it('renders without crashing', () => {
        render(
            <Provider store={createTestStore()}>
                <App />
            </Provider>
        );
    });
});
