import React from 'react';
import {shallow, mount} from 'enzyme';

import TopNav from './TopNav';

describe('<TopNav />', () => {
    it('Renders without crashing', () => {
        shallow(<TopNav />)
    });

})