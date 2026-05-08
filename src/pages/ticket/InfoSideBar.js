import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ----- components -----
import UserIcon from '../../components/UserIcon';
import LoaderSm from '../../components/LoaderSm';

// ----- actions -----
import { watchTicket } from '../../modules/auth';
import { voteTicket } from '../../modules/ticket';

// ----- css -----
import './InfoSideBar.css';

export function InfoSideBar() {
    const dispatch = useDispatch();
    const assignee = useSelector(state => state.ticket.assignee);
    const reporter = useSelector(state => state.ticket.reporter);
    const votes = useSelector(state => state.ticket.votes);
    const created = useSelector(state => state.ticket.created);
    const updated = useSelector(state => state.ticket.updated);
    const currentUser = useSelector(state => state.auth.currentUser);
    const ticket_Id = useSelector(state => state.ticket._id);
    const voteCount = votes ? votes.length : 0;

    function watch(e) {
        e.preventDefault();
        dispatch(watchTicket(ticket_Id));
    }

    function vote(e) {
        e.preventDefault();
        dispatch(voteTicket());
    }

    let votingLink;
    currentUser.voteloading? votingLink = <LoaderSm /> :
        votingLink = <button onClick={(e) => vote(e)}>Vote for this issue</button>;

    let watchLink;
    currentUser.watchloading? watchLink = <LoaderSm /> :
        watchLink = <button onClick={(e) => watch(e)}>Watch this ticket</button>;

    return (
        <section className="info-sidebar" id="info-sidebar">
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
                {new Date(created).toLocaleString('en-US')}
            </p>
            <p className="updated">
                <b>Updated:</b><br></br>
                {new Date(updated).toLocaleString('en-US')}
            </p>
        </section>
    )
}

export default InfoSideBar;
