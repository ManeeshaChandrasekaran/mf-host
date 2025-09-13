import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { loadRemoteComponent } from "./remoteLoader";
import ErrorBoundary from './components/ErrorBoundary';

// Lazy-load microfrontend components
const Login = React.lazy(() => loadRemoteComponent("auth_app", "./Login"));
const UserProfile = React.lazy(() => loadRemoteComponent("auth_app", "./UserProfile"));
const BookingList = React.lazy(() => loadRemoteComponent("booking_app", "./BookingList"));
const BookingForm = React.lazy(() => loadRemoteComponent("booking_app", "./BookingForm"));
const ReportDashboard = React.lazy(() => loadRemoteComponent("reporting_app", "./ReportDashboard"));

export default function App() {
  return (
    <Router>
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/auth/login">Login</Link> |{" "}
        <Link to="/auth/profile">Profile</Link> |{" "}
        <Link to="/booking/list">Bookings</Link> |{" "}
        <Link to="/booking/new">New Booking</Link> |{" "}
        <Link to="/reports">Reports</Link>
      </nav>
    <ErrorBoundary >
      <Suspense fallback={<div>Loading module...</div>}>
        <Routes>
          {/* Auth routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/profile" element={<UserProfile />} />

          {/* Booking routes */}
          <Route path="/booking/list" element={<BookingList />} />
          <Route path="/booking/new" element={<BookingForm />} />

          {/* Reporting routes */}
          <Route path="/reports" element={<ReportDashboard />} />

          {/* Default route */}
          <Route path="*" element={<div>Welcome to the Host App</div>} />
        </Routes>
      </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

