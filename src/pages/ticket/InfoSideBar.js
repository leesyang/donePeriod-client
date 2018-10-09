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

// ----- css -----
import './InfoSideBar.css';

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
            votingLink = <button onClick={(e) => this.vote(e)}>Vote for this issue</button>;
        
        let watchLink;
        currentUser.watchloading? watchLink = <LoaderSm /> : 
            watchLink = <button onClick={(e) => this.watch(e)}>Watch this ticket</button>;

        return (
            <section className="info-sidebar">
                <h3>More Info:</h3>
                <div className="icon-container"><b>Assignee: </b><UserIcon user={assignee} /></div>
                <div className="icon-container"><b>Reporter: </b>{<UserIcon user={reporter} />}</div>
                <div className="votes">
                    <b>Votes: </b><span className="count">{voteCount}</span><br></br>
                    {votingLink}
                </div>
                <div className="watchers">
                    {watchLink}
                </div>
                <p className="created">
                    <b>Created:</b><br></br>
                    {new Date(this.props.created).toLocaleString('en-US')}
                </p>
                <p className="updated">
                    <b>Updated:</b><br></br>
                    {new Date(this.props.updated).toLocaleString('en-US')}
                </p>
            </section>
        )
    }
}

const mapStateToProps = state => {
    const {
        _id,
        assignee,
        reporter,
        team,
        votes,
        created,
        updated
    } = state.ticket;

    return {
        assignee,
        reporter,
        team,
        votes,
        created,
        updated,
        currentUser: state.auth.currentUser,
        ticket_Id: _id,
        voteCount: votes.length,
    }
}

export default connect(mapStateToProps)(InfoSideBar);