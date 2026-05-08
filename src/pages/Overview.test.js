import React from 'react';
import { renderWithProviders } from '../test-utils';
import Overview from './Overview';

describe('<Overview />', () => {
    it('renders without crashing', () => {
        renderWithProviders(<Overview />);
    });
});
