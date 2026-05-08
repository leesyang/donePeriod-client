import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './modules/auth';
import ticketReducer from './modules/ticket';
import protectedDataReducer from './modules/ticketsData';
import usersReducer from './modules/users';

export function createTestStore(preloadedState = {}) {
    return configureStore({
        reducer: {
            auth: authReducer,
            users: usersReducer,
            protectedData: protectedDataReducer,
            ticket: ticketReducer,
        },
        preloadedState,
    });
}

export function renderWithProviders(ui, { route = '/', preloadedState = {} } = {}) {
    const store = createTestStore(preloadedState);
    return {
        ...render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[route]}>
                    {ui}
                </MemoryRouter>
            </Provider>
        ),
        store,
    };
}

export const mockUser = {
    firstName: 'Test',
    lastName: 'User',
    profilePicture: 'test.jpg',
    isEditing: false,
    photoUpdateLoading: false,
    assigned: [],
    watching: [],
    noteadding: false,
    noteloading: false,
    notes: [],
    error: null,
    errorInfo: null,
};
