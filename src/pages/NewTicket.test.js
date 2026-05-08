import React from 'react';
import { renderWithProviders } from '../test-utils';
import NewTicket from './NewTicket';

describe('<NewTicket />', () => {
    it('renders without crashing', () => {
        renderWithProviders(<NewTicket />);
    });
});
