import React from 'react';
import { renderWithProviders } from '../test-utils';
import Signup from './Signup';

describe('<Signup />', () => {
    it('renders without crashing', () => {
        renderWithProviders(<Signup />);
    });
});
