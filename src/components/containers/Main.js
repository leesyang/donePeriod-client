import React from 'react';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from '../../components/ProtectedRoute';

// ----- components -----
import Home from '../../pages/Home'
import Overview from '../../pages/Overview';
import NewTicket from '../../pages/NewTicket';
import Ticket from '../../pages/Ticket';
import NavBar from '../navigation/NavBar';

// ----- css -----
import './Main.css'


export function Main() {
  return (
    <div className="main">
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/overview/new" element={<NewTicket />} />
        <Route path="/issues" element={<Overview />} />
        <Route path="/issues/:ticketId" element={<Ticket />} />
      </Routes>
    </div>
  );
}

export default ProtectedRoute()(Main);
