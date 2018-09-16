import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import UserIcon from '../../components/UserIcon';
import LoaderSm from '../../components/LoaderSm';

// ----- util functions -----
import { generateFullName } from '../../utils/tickets';

// ----- actions -----
import { watchTicket, voteTicket} from '../../modules/auth';

export class InfoSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.watch = this.watch.bind(this);
        this.vote = this.vote.bind(this);
        this.assign = this.assign.bind(this);
    }

    watch(userId) {
        this.props.dispatch(watchTicket(userId));
    }

    vote(userId) {
        this.props.dispatch(voteTicket(userId));
    }

    assign() {
        console.log('assigning a user');
    }

    render () {
        const { assignee, reporter, currentUser, ticket_Id } = this.props;

        let watcherCount = this.props.watchers.length;

        let votesCount = this.props.votes.length;

        let assignButton = (
            <button className="assign-button" onClick={this.assign}>Assign a user</button>
        )

        let votingLink;
        currentUser.voteloading? votingLink = <LoaderSm /> : 
            votingLink = <a href="#" onClick={() => this.vote(currentUser.id)}>Vote for this issue</a>;
        
        let watchLink;
        currentUser.watchloading? watchLink = <LoaderSm /> : 
            watchLink = <a href="#" onClick={() => this.watch(ticket_Id)}>Watch this ticket</a>;

        return (
            <div className="info-sidebar">
                <h1>infosidebar</h1>
                <div className="assignee">Assignee: {assignee? <UserIcon user={assignee} /> : assignButton }</div>
                <div className="reporter">Reporter: {<UserIcon user={reporter} />}</div>
                <div className="votes">
                    <a>Votes: <span className="count">{votesCount}</span></a>
                    {votingLink}
                </div>
                <div className="watchers">
                    <a>Watchers: {watcherCount}</a>
                    {watchLink}
                </div>
                <div className="created">Created: {new Date(this.props.created).toLocaleString('en-US')}</div>
                <div className="updated">Updated: {new Date(this.props.updated).toLocaleString('en-US')}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        ticket_Id: state.ticket._id,
        assignee: state.ticket.assignee,
        reporter: state.ticket.reporter,
        team: state.ticket.team,
        votes: state.ticket.votes,
        watchers: state.ticket.watchers,
        created: state.ticket.created,
        updated: state.ticket.updated
    }
}

export default connect(mapStateToProps)(InfoSideBar);