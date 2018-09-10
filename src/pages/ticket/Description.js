import React from 'react';
import { connect } from 'react-redux';

export class Description extends React.Component {
    render () {
        return (
            <div className="description">
                Description: {this.props.description}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    description: state.ticket.description
})

export default connect(mapStateToProps)(Description)