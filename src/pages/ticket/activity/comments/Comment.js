import React from 'react';
import { connect } from 'react-redux';

export class Comment extends React.Component {
    render() {
        return <div>a comment</div>
    }
}

export default connect()(Comment)