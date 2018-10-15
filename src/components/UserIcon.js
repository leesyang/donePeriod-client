import React from 'react';

// ----- consts -----
import { AMZ_S3_URL } from '../config';

// ----- util functions -----
import { generateFullName } from '../utils/tickets';

// ----- css -----
import './UserIcon.css';

export default class UserIcon extends React.Component {
    render() {
        const { user, user: { profilePicture } } = this.props;

        return (
            <div className="user-icon">
                <img src={AMZ_S3_URL+profilePicture} alt="user icon" className="user-img-icon"></img>
                <span>{generateFullName(user)}</span>
            </div>
        )
    }
}