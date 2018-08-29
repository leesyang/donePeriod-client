import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

//import logo from './logo.svg';
import './App.css';

// ----- imports: components -----
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login  from './pages/Login';
import Overview from './pages/Overview';
import Ticket from './pages/Ticket';
import Signup from './pages/Signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        { /* Routes*/}
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />

        { /* Routes Requiring Login */}
        <Route exact path='/home' component={Home} />
        <Route exact path='/overview' component={Overview} />
        <Route exact path='/issues/:ticketId' component={Ticket} />
      </div>
    );
  }
}

export default App;