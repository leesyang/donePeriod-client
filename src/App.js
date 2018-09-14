import React from 'react';
import { Route, Switch } from "react-router-dom";

//import logo from './logo.svg';
import './App.css';

// ----- imports: components -----
import Landing from './pages/Landing';
import Login  from './pages/Login';
import Signup from './pages/Signup';
import Main from './components/containers/Main';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        { /* Routes*/}
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Main />
        </Switch>
      </div>
    );
  }
}

export default App;