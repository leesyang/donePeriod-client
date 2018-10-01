import React from 'react';
import { connect } from 'react-redux';

// ----- constants -----
import { USER_PHOTO_URL } from '../../../../config';
import { formatDateShort } from '../../../../utils/auth';

// ----- actions -----
import { removeComment } from '../../../../modules/ticket';


export class Comment extends React.Component {
    onDelete(e) {
        e.preventDefault();
        const { _id } = this.props.comment;
        this.props.dispatch(removeComment(_id));
    }

    render() {
        const {comment, dateAdded } = this.props.comment;
        const { firstName, lastName, profilePicture } = this.props.comment.addedBy;

        return (
            <li className="ticket-comment">
                <img src={USER_PHOTO_URL+profilePicture}></img>
                <p>{comment}</p>
                <p> Added By: {firstName} {lastName}</p>
                <p>Date Added: {formatDateShort(dateAdded)}</p>
                <a href="" onClick={(e) => this.onDelete(e)}>Delete</a>
            </li>
        )

    }
}

export default connect()(Comment)