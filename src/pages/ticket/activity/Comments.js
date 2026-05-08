import React from 'react';
import { useSelector } from 'react-redux';

// ----- components -----
import Comment from './comments/Comment';
import CommentForm from './comments/CommentForm';

export function Comments() {
    const comments = useSelector(state => state.ticket.comments);

    let commentList = comments.map((comment, index) => {
        return <Comment comment={comment} key={index} />
    })

    return (
        <div className="comments-container">
            <ul className="ticket-comments">
                {commentList}
            </ul>
            <CommentForm />
        </div>
    )
}

export default Comments;
