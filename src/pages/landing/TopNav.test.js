import React from 'react';
import { renderWithProviders } from '../../test-utils';
import TopNav from './TopNav';

describe('<TopNav />', () => {
    it('renders without crashing', () => {
        renderWithProviders(<TopNav />);
    });
});
