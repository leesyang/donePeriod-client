import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import UserIcon from '../../components/UserIcon';
import LoaderSm from '../../components/LoaderSm';

// ----- util functions -----
import { generateFullName } from '../../utils/tickets';

// ----- actions -----
import { watchTicket } from '../../modules/auth';
import { voteTicket } from '../../modules/ticket';

export class InfoSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.watch = this.watch.bind(this);
        this.vote = this.vote.bind(this);
    }

    watch(e) {
        e.preventDefault();
        const { ticket_Id } = this.props;
        this.props.dispatch(watchTicket(ticket_Id));
    }

    vote(e) {
        e.preventDefault();
        this.props.dispatch(voteTicket())
    }

    render () {
        const { assignee, reporter, currentUser, votes, voteCount} = this.props;

        let votingLink;
        currentUser.voteloading? votingLink = <LoaderSm /> : 
            votingLink = <a href="" onClick={(e) => this.vote(e)}>Vote for this issue</a>;
        
        let watchLink;
        currentUser.watchloading? watchLink = <LoaderSm /> : 
            watchLink = <a href="" onClick={(e) => this.watch(e)}>Watch this ticket</a>;

        return (
            <div className="info-sidebar">
                <h1>infosidebar</h1>
                <div className="assignee">Assignee: <UserIcon user={assignee} /></div>
                <div className="reporter">Reporter: {<UserIcon user={reporter} />}</div>
                <div className="votes">
                    <a>Votes: <span className="count">{voteCount}</span></a>
                    {votingLink}
                </div>
                <div className="watchers">
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
        voteCount: state.ticket.votes.length,
        created: state.ticket.created,
        updated: state.ticket.updated
    }
}

export default connect(mapStateToProps)(InfoSideBar);