import React from 'react';
import { connect } from 'react-redux';

// ----- components -----
import NavButton from '../../components/navigation/NavButton';
import LoaderExtraSm from '../../components/LoaderExtraSm';

// ----- actions -----
import { toggleLogin, toggleSignup, login } from '../../modules/auth';

// ----- images -----
import logoWhite from '../../images/logo-white.png';

// ----- css -----
import './TopNav.css';

export class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.onClickDemo = this.onClickDemo.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onClickHome = this.onClickHome.bind(this);
        this.onClickSignup = this.onClickSignup.bind(this);
    }
    onClickLogin() {
        this.props.dispatch(toggleLogin(true));
    }

    onClickHome() {
        this.props.dispatch(toggleLogin(false));
    }

    onClickSignup() {
        this.props.dispatch(toggleSignup(true));
    }

    onClickDemo() {
        this.props.dispatch(login('demo', 'password123'))
    }

    render () {
        const { loggingIn } = this.props;

        let navButtons;
        if (loggingIn) {
            navButtons = (
                <nav className="top-nav-buttons">
                    <NavButton name='Login' onClick={this.onClickLogin}/>
                    <NavButton name='Signup' onClick={this.onClickSignup}/>
                    <NavButton name="Demo" onClick={this.onClickDemo} />
                    <LoaderExtraSm />
                </nav>)
        } else {
            navButtons = (
                <nav className="top-nav-buttons">
                    <NavButton name='Login' onClick={this.onClickLogin}/>
                    <NavButton name='Signup' onClick={this.onClickSignup}/>
                    <NavButton name="Demo" onClick={this.onClickDemo} />
                </nav>)
        }

        return (
            <div className="top-nav">
                <img src={logoWhite} alt="app logo" onClick={() => this.onClickHome()} className="home-logo"></img>
                {navButtons}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggingIn: state.auth.loading
})

export default connect(mapStateToProps)(TopNav);