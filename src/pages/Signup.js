import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


// ----- components -----
import Form from './signup/Form'

export class Signup extends React.Component {
    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/home" />
        }
        else {
            return (
                <div className="signup">
                    <Form />
                </div>
            )
        }
    }
}

const mapStateToProps = (state, props) => ({
    loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(Signup);

loggedIn: true
