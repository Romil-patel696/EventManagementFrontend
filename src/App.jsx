import React from 'react';
import Sidebar from './component2/Sidebar';
import MyEvents from './component2/MyEvents';
import Dashboard from './component2/Dashboard';
import AddEvent from './component2/AddEvent';
import Settings from './component2/Settings';
import EventDetails from './component2/EventDetails';
// import Login from './component2/Login';
// import Register from './component2/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// import { EventProvider } from './contexts/EventContext';
// import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import EditEvent from './component2/EditEvent';
const App = () => {
  return (

   <EventProvider>
   <Router>
          <div className="app-container">
            <Sidebar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/my-events" element={<MyEvents />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/add-event" element={<AddEvent />} />
                <Route path="/settings" element={<Settings />} />

                <Route path="/edit-event/:id" element={<EditEvent />} />
              </Routes>
          
        </div>
      </div>
    </Router>
    </EventProvider>
 
  );
};

export default App;











