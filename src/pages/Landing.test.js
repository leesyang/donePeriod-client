import React from 'react';
import { renderWithProviders } from '../test-utils';
import Landing from './Landing';

describe('<Landing />', () => {
    it('renders without crashing', () => {
        renderWithProviders(<Landing />);
    });
});
