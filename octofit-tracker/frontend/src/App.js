import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  console.log('App initialized');
  console.log('Codespace Name:', process.env.REACT_APP_CODESPACE_NAME);

  return (
    <Router>
      <div className="App">
        {/* Navigation Menu */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              🏃‍♂️ OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/activities">
                    <i className="bi bi-activity me-1"></i>Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <i className="bi bi-trophy me-1"></i>Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    <i className="bi bi-people me-1"></i>Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <i className="bi bi-person-circle me-1"></i>Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    <i className="bi bi-heart-pulse me-1"></i>Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

// Home Component
function Home() {
  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">
              🏃‍♂️ Welcome to OctoFit Tracker
            </h1>
            <p className="lead text-muted mb-4">
              Your comprehensive fitness application for tracking activities, managing teams, and competing on leaderboards.
            </p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-activity text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title">Track Activities</h5>
                  <p className="card-text text-muted">Log and monitor your fitness activities with detailed tracking.</p>
                  <Link to="/activities" className="btn btn-primary">
                    View Activities
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-trophy text-warning" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title">Compete on Leaderboard</h5>
                  <p className="card-text text-muted">See how you rank against other fitness enthusiasts.</p>
                  <Link to="/leaderboard" className="btn btn-warning">
                    View Leaderboard
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-people text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title">Manage Teams</h5>
                  <p className="card-text text-muted">Create and manage fitness teams for group challenges.</p>
                  <Link to="/teams" className="btn btn-success">
                    View Teams
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="alert alert-info border-0 shadow-sm" role="alert">
                <h5 className="alert-heading">
                  <i className="bi bi-info-circle me-2"></i>Getting Started
                </h5>
                <p className="mb-0">
                  Navigate to Activities, Leaderboard, Teams, Users, or Workouts using the menu above to explore all features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
