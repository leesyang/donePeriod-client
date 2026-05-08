import React from 'react';
import { renderWithProviders, mockUser } from '../test-utils';
import Home from './Home';

describe('<Home />', () => {
    it('renders without crashing', () => {
        renderWithProviders(<Home />, {
            preloadedState: {
                auth: {
                    authToken: null,
                    currentUser: mockUser,
                    loading: false,
                    error: null,
                    logIn: false,
                    signUp: false,
                },
            },
        });
    });
});
