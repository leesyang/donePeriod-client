import React from 'react';
import { connect } from 'react-redux';
import prettyFileIcons from 'pretty-file-icons';

// ----- constants -----
import { AMZ_S3_URL } from '../../../../config';
import { formatDateShort } from '../../../../utils/auth';

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
        const { ticketId } = this.props;
        const { firstName, lastName, profilePicture } = this.props.comment.addedBy;

        let fileLinks = files? files.map((file, index) => { 
            const link = AMZ_S3_URL+file;
            const fileIcon = prettyFileIcons.getIcon(link, 'svg');
            return (
                <li key={index} className="attachment">
                    <a href={link} target="_blank"><img className="attachement-icon" src={AMZ_S3_URL+'icons/'+fileIcon}/></a>
                </li>
            )}) : undefined;

        return (
            <li className="comment">
                <img src={AMZ_S3_URL+profilePicture}></img>
                <p>{comment}</p>
                <p>Added By: {firstName} {lastName}</p>
                <p>Date Added: {formatDateShort(dateAdded)}</p>
                <ul className="file-list">
                    Attachments: {fileLinks}
                </ul>
                <a href="" onClick={(e) => this.onDelete(e)}>Delete</a>
            </li>
        )

    }
}

export default connect()(Comment)