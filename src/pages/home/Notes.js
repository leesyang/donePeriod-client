import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import Note from './notes/Note';
import PlusButton from '../../components/PlusButton';
import NoteForm from './notes/NoteForm';
import LoaderSm from '../../components/LoaderSm';

// ----- actions -----
import { noteAdding, deleteNote } from '../../modules/auth';

// ----- css -----
import './Notes.css';

export class Notes extends React.Component {
    onClick() {
        this.props.dispatch(noteAdding(true));
    }

    onCancel() {
        this.props.dispatch(noteAdding(false));
    }

    onDelete(noteId) {
        this.props.dispatch(deleteNote(noteId))
    }

    render() { 
        const { noteadding, noteloading, notes } = this.props;

        let noteForm = noteadding?
            (<div className="note-form">
                <NoteForm onClick={() => this.onCancel()}/>
            </div>) : undefined;

        if(noteloading) { noteForm = <LoaderSm /> }

        let allNotes;
        if(notes.length > 0){
            allNotes = notes.map(note => {
                return <Note key={note._id} note={note} onDelete={(noteId) => this.onDelete(noteId)} />
                })
        } else {
            allNotes = undefined;
        }

        return (
            <div className="notes">
                <PlusButton onClick={() => this.onClick()}/>
                {noteForm}
                <ul className="all-notes">
                    {allNotes}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        noteadding: state.auth.currentUser.noteadding,
        noteloading: state.auth.currentUser.noteloading,
        notes: state.auth.currentUser.notes,
        error: state.auth.currentUser.error,
        errorInfo: state.auth.currentUser.errorInfo
    }
}

export default connect(mapStateToProps)(Notes)