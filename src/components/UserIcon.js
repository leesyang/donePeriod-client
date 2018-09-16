import React from 'react';

// ----- util functions -----
import { generateFullName } from '../utils/tickets';

export default class UserIcon extends React.Component {
    render() {
        return (
            <div className="user-icon">
                <div>USER_IMG</div>
                <div>{generateFullName(this.props.user)}</div>
            </div>
        )
    }
}