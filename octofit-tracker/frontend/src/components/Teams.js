import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/teams/`;
        
        console.log('Fetching teams from URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Teams API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams data:', teamsData);
        
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading teams...</span>
          </div>
          <p className="mt-3 text-muted">Loading teams...</p>
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
              <i className="bi bi-exclamation-triangle me-2"></i>Error Loading Teams
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
            <h1 className="h2 fw-bold text-success mb-0">
              <i className="bi bi-people me-2"></i>Teams
            </h1>
            <button className="btn btn-success">
              <i className="bi bi-plus-circle me-1"></i>Create Team
            </button>
          </div>

          {teams.length === 0 ? (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-people text-muted" style={{ fontSize: '4rem' }}></i>
                <h5 className="card-title text-muted mt-3">No Teams Found</h5>
                <p className="card-text text-muted">Create your first team to start collaborating with others.</p>
                <button className="btn btn-success">
                  <i className="bi bi-plus-circle me-1"></i>Create Your First Team
                </button>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-success">
                      <tr>
                        <th className="border-0 fw-semibold">#</th>
                        <th className="border-0 fw-semibold">Team Name</th>
                        <th className="border-0 fw-semibold">Description</th>
                        <th className="border-0 fw-semibold text-center">Members</th>
                        <th className="border-0 fw-semibold">Created Date</th>
                        <th className="border-0 fw-semibold text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((team, index) => (
                        <tr key={team.id} className="align-middle">
                          <td className="fw-semibold text-muted">{index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar-circle bg-success text-white me-3 d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                                {team.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="fw-semibold">{team.name}</span>
                            </div>
                          </td>
                          <td className="text-muted">{team.description}</td>
                          <td className="text-center">
                            <span className="badge bg-info">{team.member_count || team.members?.length || 0}</span>
                          </td>
                          <td>
                            <small className="text-muted">
                              {new Date(team.created_at).toLocaleDateString()}
                            </small>
                          </td>
                          <td className="text-center">
                            <div className="btn-group btn-group-sm" role="group">
                              <button className="btn btn-outline-success btn-sm">
                                <i className="bi bi-eye"></i>
                              </button>
                              <button className="btn btn-outline-secondary btn-sm">
                                <i className="bi bi-person-plus"></i>
                              </button>
                              <button className="btn btn-outline-primary btn-sm">
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button className="btn btn-outline-danger btn-sm">
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
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

export default Teams;
