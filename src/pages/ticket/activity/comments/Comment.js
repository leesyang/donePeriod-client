import React from 'react';
import { connect } from 'react-redux';
import {
    PopupboxManager,
    PopupboxContainer
  } from 'react-popupbox';

// ----- constants -----
import { USER_PHOTO_URL } from '../../../../config';
import { TICKET_ATTACHMENTS_URL } from '../../../../config';
import { formatDateShort } from '../../../../utils/auth';

// ----- actions -----
import { removeComment, removeWorkLog } from '../../../../modules/ticket';


export class Comment extends React.Component {
    onDelete(e) {
        e.preventDefault();
        const { files } = this.props.comment;
        const { _id } = this.props.comment;
        files? this.props.dispatch(removeWorkLog(_id)) : this.props.dispatch(removeComment(_id));
    }

    render() {
        const {comment, dateAdded, files } = this.props.comment;
        const { ticketId } = this.props;
        const { firstName, lastName, profilePicture } = this.props.comment.addedBy;

        let fileLinks = files? files.map((file, index) => { 
            let link = TICKET_ATTACHMENTS_URL+ticketId+'/'+file;
            return (
                <li key={index} >
                    <a href={link} target="_blank">{file}</a>
                </li>
            )}) : undefined;

        return (
            <li className="comment">
                <img src={USER_PHOTO_URL+profilePicture}></img>
                <p>{comment}</p>
                <p>Added By: {firstName} {lastName}</p>
                <p>Date Added: {formatDateShort(dateAdded)}</p>
                <ul className="file-list">{fileLinks}</ul>
                <PopupboxContainer />
                <a href="" onClick={(e) => this.onDelete(e)}>Delete</a>
            </li>
        )

    }
}

export default connect()(Comment)