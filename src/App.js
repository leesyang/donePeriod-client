import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';

// ----- imports: components -----
import Landing from './pages/Landing';
import Main from './components/containers/Main';

// ----- css -----
import './pages/Login.css';
import './pages/Signup.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        { /* Routes*/}
        <Switch>
          <Route exact path='/' component={Landing} />
          <Main />
        </Switch>
      </div>
    );
  }
}

export default App;