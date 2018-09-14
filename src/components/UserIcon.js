import React from 'react';
import { connect } from 'react-redux';

export class UserIcon extends React.Component {
    render() {
        return (
            <div className="user-icon">
                USER_IMG, name
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

export default connect(mapStateToProps)(UserIcon)