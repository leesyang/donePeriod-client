import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import Comment from './comments/Comment';
import CommentForm from './comments/CommentForm';

export class Comments extends React.Component {
    render () {
        let comments = this.props.comments.map((comment,index) => {
            return <Comment comment={comment} key={index} />
        })

        return (
            <div className="comments-container">
                <ul className="ticket-comments">
                    {comments}
                </ul>
                <CommentForm />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    comments: state.ticket.comments
})

export default connect(mapStateToProps)(Comments)