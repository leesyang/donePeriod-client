import React from 'react';
import { useDispatch } from 'react-redux';
import { ChevronRight } from 'lucide-react';

// ----- constants -----
import { AMZ_S3_URL } from '../../../../config';
import { formatDateShort } from '../../../../utils/auth';

// ----- components -----
import FileList from '../../../../components/FileList';

// ----- actions -----
import { removeComment, removeWorkLog } from '../../../../modules/ticket';

// ----- css -----
import './Comment.css';

export function Comment({ comment }) {
    const dispatch = useDispatch();

    function onDelete(e) {
        e.preventDefault();
        const { files, _id } = comment;
        files? dispatch(removeWorkLog(_id)) : dispatch(removeComment(_id));
    }

    const { comment: commentText, dateAdded, files } = comment;
    const { firstName, lastName, profilePicture } = comment.addedBy;

    let attachments = files? <div className="worklog-attachments">Attachments: <FileList files={files}/></div> : undefined;

    return (
        <li className="comment">
            <p className="comment-text">
                <img className="comment-user" src={AMZ_S3_URL+profilePicture} alt="user"></img>
                <ChevronRight className="arrow-icon" color="#172B4D" size={16} />
                {commentText}
            </p>
            {attachments}
            <p className="comment-info">
                Posted by {firstName} {lastName} on {formatDateShort(dateAdded)}
                <button onClick={(e) => onDelete(e)} className="button-delete">Delete</button>
            </p>
        </li>
    )
}

export default Comment;
