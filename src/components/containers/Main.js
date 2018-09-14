import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import ProtectedRoute from '../../components/ProtectedRoute';

// ----- components -----
import Home from '../../pages/Home'
import Overview from '../../pages/Overview';
import NewTicket from '../../pages/NewTicket';
import Ticket from '../../pages/Ticket';
import NavBar from '../navigation/NavBar';

export class Main extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <div className="main">
          { /* Routes Requiring Login */}
          <NavBar />
          <Route exact path='/home' component={Home} />
          <Route exact path='/overview' component={Overview} />
          <Route exact path='/overview/new' component={NewTicket} />
          <Route exact path='/issues/:ticketId' component={Ticket} />
        </div>
      );
    }
  }

const mapStateToProps = state => {
  //console.log(state);
  return {}
}

export default ProtectedRoute()(connect(mapStateToProps)(Main));