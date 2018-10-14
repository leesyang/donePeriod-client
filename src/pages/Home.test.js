import React from 'react';
import { shallow, mount } from 'enzyme';

import { Home } from './Home';

describe('', () => {
    it('Renders without crashing', () => {
        shallow(<Home />)
    });

})