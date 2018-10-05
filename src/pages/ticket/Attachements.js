import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import FileList from '../../components/FileList';

export class Attachments extends React.Component {
    render () {
        const { attachments } = this.props;
        return (
            <div className="attachments-container">
                Attachments: 
                <FileList files={attachments}/>
            </div>
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