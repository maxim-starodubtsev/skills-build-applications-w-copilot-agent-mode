import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
        
        console.log('Fetching leaderboard from URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Leaderboard API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard data:', leaderboardData);
        
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading leaderboard...</span>
          </div>
          <p className="mt-3 text-muted">Loading leaderboard...</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="alert alert-danger border-0 shadow-sm" role="alert">
            <h5 className="alert-heading">
              <i className="bi bi-exclamation-triangle me-2"></i>Error Loading Leaderboard
            </h5>
            <p className="mb-0">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 fw-bold text-warning mb-0">
              <i className="bi bi-trophy me-2"></i>Leaderboard
            </h1>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary">
                <i className="bi bi-funnel me-1"></i>Filter
              </button>
              <button className="btn btn-warning">
                <i className="bi bi-trophy me-1"></i>My Rank
              </button>
            </div>
          </div>

          {leaderboard.length === 0 ? (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-trophy text-muted" style={{ fontSize: '4rem' }}></i>
                <h5 className="card-title text-muted mt-3">No Leaderboard Data</h5>
                <p className="card-text text-muted">Start participating in activities to appear on the leaderboard.</p>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-warning">
                      <tr>
                        <th className="border-0 fw-semibold text-center" style={{ width: '80px' }}>Rank</th>
                        <th className="border-0 fw-semibold">User</th>
                        <th className="border-0 fw-semibold text-center">Points</th>
                        <th className="border-0 fw-semibold text-center">Activities</th>
                        <th className="border-0 fw-semibold text-center">Badge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, index) => (
                        <tr key={entry.id || index} className="align-middle">
                          <td className="text-center">
                            <div className={`badge ${index === 0 ? 'bg-warning text-dark' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-danger' : 'bg-light text-dark'} fs-6 fw-bold`}>
                              #{index + 1}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar-circle bg-primary text-white me-3 d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                                {(entry.user || entry.username || 'U').charAt(0).toUpperCase()}
                              </div>
                              <span className="fw-semibold">{entry.user || entry.username}</span>
                            </div>
                          </td>
                          <td className="text-center">
                            <span className="badge bg-success fs-6">{entry.points || entry.score || 0}</span>
                          </td>
                          <td className="text-center">
                            <span className="text-muted">{entry.activities_completed || entry.total_activities || 0}</span>
                          </td>
                          <td className="text-center">
                            {index === 0 && <i className="bi bi-trophy-fill text-warning fs-5"></i>}
                            {index === 1 && <i className="bi bi-medal-fill text-secondary fs-5"></i>}
                            {index === 2 && <i className="bi bi-award-fill text-danger fs-5"></i>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
