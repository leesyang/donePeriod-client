import React from 'react';
import { connect } from 'react-redux';

export class InfoSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.watch = this.watch.bind(this);
        this.vote = this.vote.bind(this);
    }

    watch() {
        console.log('watching ticket');
    }

    vote() {
        console.log('voting for ticket');
    }

    render () {
        let watcherCount = this.props.watchers.length;
        let votesCount = this.props.votes.length;

        return (
            <div className="info-sidebar">
                this is the info-sidebar
                <div className="assignee">{this.props.assignee}</div>
                <div className="reporter">{this.props.reporter}</div>
                <div className="votes">
                    <a>Votes: <span className="count">{votesCount}</span></a>
                    <a href="#" onClick={this.vote}>Vote for this issue</a>
                </div>
                <div className="watchers">
                    <a>Watchers: {watcherCount}</a>
                    <a href="#" onClick={this.watch}>Watch this ticket</a>
                </div>
                <div className="created">Created: {new Date(this.props.created).toLocaleString('en-US')}</div>
                <div className="updated">Updated: {new Date(this.props.updated).toLocaleString('en-US')}</div>
            </div>
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