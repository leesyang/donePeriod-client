import React from 'react';
import { renderWithProviders } from '../test-utils';
import Login from './Login';

describe('<Login />', () => {
    it('renders without crashing', () => {
        renderWithProviders(<Login />);
    });
});
