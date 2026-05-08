import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// ----- imports: components -----
import Landing from './pages/Landing';
import Main from './components/containers/Main';

// ----- css -----
import './pages/Login.css';
import './pages/Signup.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/*" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
