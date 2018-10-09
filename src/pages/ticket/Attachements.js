import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import FileList from '../../components/FileList';

export class Attachments extends React.Component {
    render () {
        const { attachments } = this.props;
        return (
            <section className="attachments-container">
                <header>Attachments:</header>
                <div className="file-list-container">
                    <FileList files={attachments}/>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        attachments: state.ticket.attachments
    }
}

export default connect(mapStateToProps)(Attachments)