import React from 'react';
import { connect } from 'react-redux';

// ----- import actions -----
import { updateInfoRequest, updateInfo } from '../../modules/ticket';

// ----- components -----

export class Info extends React.Component {
    constructor(props) {
        super(props);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickReset = this.onClickReset.bind(this);
    }

    onClickEdit () {
        console.log('onclick working')
        this.props.dispatch(updateInfoRequest())
    }

    onClickReset() {
        this.props.dispatch(updateInfo())
    }

    render () {
        const { type, status, priority, resolution, isEditing } = this.props;
        if(isEditing) { 
           return <div></div>
        }

        return (
            <div className="ticket-info">
                <button onClick={this.onClickEdit}>Edit Fields</button>
                <div className="column">Type: {type}</div>
                <div className="column">Status: {status}</div>
                <div className="column">Priority: {priority}</div>
                <div className="column">Resolution: {resolution}</div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.ticket.ticketInfo
})

export default connect(mapStateToProps)(Info);