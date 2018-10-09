import React from 'react';
import { connect } from 'react-redux';
import Ionicon from 'react-ionicons';

// ----- constants -----
import { AMZ_S3_URL } from '../../../../config';
import { formatDateShort } from '../../../../utils/auth';

// ----- components -----
import FileList from '../../../../components/FileList';

// ----- actions -----
import { removeComment, removeWorkLog } from '../../../../modules/ticket';

// ----- css -----
import './Comment.css';

export class Comment extends React.Component {
    onDelete(e) {
        e.preventDefault();
        const { files } = this.props.comment;
        const { _id } = this.props.comment;
        files? this.props.dispatch(removeWorkLog(_id)) : this.props.dispatch(removeComment(_id));
    }

    render() {
        const {comment, dateAdded, files } = this.props.comment;
        const { firstName, lastName, profilePicture } = this.props.comment.addedBy;

        let attachments = files? <div className="worklog-attachments">Attachments: <FileList files={files}/></div> : undefined;

        return (
            <li className="comment">
                <p className="comment-text">
                    <img className="comment-user" src={AMZ_S3_URL+profilePicture}></img>
                    <Ionicon icon="md-arrow-dropright" className="arrow-icon" color="#172B4D" />
                    {comment}
                </p>
                {attachments}
                <p className="comment-info">
                    Posted by {firstName} {lastName} on {formatDateShort(dateAdded)}
                    <button onClick={(e) => this.onDelete(e)} className="button-delete">Delete</button>
                </p>
            </li>
        )

    }
}

export default connect()(Comment)