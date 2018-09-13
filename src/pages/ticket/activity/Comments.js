import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import Comment from './comments/Comment';

export class Comments extends React.Component {
    render () {
        let comments = this.props.comments.map((comment,index) => {
            return <Comment comment={comment} key={index} />
        })

        return (
            <div className="comments-container">
                {comments}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    comments: state.ticket.activity.comments
})

export default connect(mapStateToProps)(Comments)