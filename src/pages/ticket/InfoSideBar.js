import React from 'react';
import { connect } from 'react-redux';

export class InfoSideBar extends React.Component {
    render () {
        return (
            <div>this is the infosidebar</div>
        )
    }
}

const mapStateToProps = state => ({
    assignee: state.ticket.assignee,
    reporter: state.ticket.reporter,
    team: state.ticket.team,
    votes: state.ticket.votes,
    watchers: state.ticket.watchers,
    created: state.ticket.created,
    updated: state.ticket.updated
})

export default connect(mapStateToProps)(InfoSideBar);