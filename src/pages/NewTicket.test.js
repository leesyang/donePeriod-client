import React from 'react';
import { shallow, mount } from 'enzyme';

import { NewTicket } from './NewTicket';

describe('<NewTicket />', () => {
    it('Renders without crashing', () => {
        shallow(<NewTicket />)
    });

})