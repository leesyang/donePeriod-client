import React from 'react';
import { useSelector } from 'react-redux';

// ----- components -----
import FileList from '../../components/FileList';

export function Attachments() {
    const attachments = useSelector(state => state.ticket.attachments);

    return (
        <section className="attachments-container">
            <header>Attachments:</header>
            <div className="file-list-container">
                <FileList files={attachments}/>
            </div>
        </section>
    )
}

export default Attachments;
