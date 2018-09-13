import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

export class NavBar extends React.Component {
    render() {
        const { currentUser, loggedIn } = this.props;

        return (
            <div className="navbar">
                <div className="nav-dropdown">
                    <Link to="/home">Home</Link>
                    <Link to="/overview">Overview</Link>
                    <Link to="/overview/new">Submit New</Link>
                </div>
                <div>
                    
                </div>
            </div>

            
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        loggedIn: state.auth.currentUser !== null,
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(NavBar)

{/* <div class="navbar">
  <a href="#home">Home</a>
  <a href="#news">News</a>
  <div class="dropdown">
    <button class="dropbtn">Dropdown 
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div> 
</div> */}