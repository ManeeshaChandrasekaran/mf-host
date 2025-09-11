import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DynamicRemoteComponent from './components/DynamicRemoteComponent';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/auth">Auth</Link> | <Link to="/booking">Booking</Link> | <Link to="/reporting">Reporting</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<h1>Host App Home</h1>} />
          <Route path="/auth" element={<DynamicRemoteComponent scope="auth_app" module="./Login" />} />
          <Route path="/booking" element={<DynamicRemoteComponent scope="booking_app" module="./BookingList" />} />
          <Route path="/reporting" element={<DynamicRemoteComponent scope="reporting_app" module="./ReportDashboard" />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
