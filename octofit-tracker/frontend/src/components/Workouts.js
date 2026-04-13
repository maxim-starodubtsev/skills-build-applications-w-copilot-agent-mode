import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
        
        console.log('Fetching workouts from URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Workouts API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts data:', workoutsData);
        
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading workouts...</span>
          </div>
          <p className="mt-3 text-muted">Loading workouts...</p>
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
              <i className="bi bi-exclamation-triangle me-2"></i>Error Loading Workouts
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
            <h1 className="h2 fw-bold text-danger mb-0">
              <i className="bi bi-heart-pulse me-2"></i>Workouts
            </h1>
            <button className="btn btn-danger">
              <i className="bi bi-plus-circle me-1"></i>Create Workout
            </button>
          </div>

          {workouts.length === 0 ? (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-heart-pulse text-muted" style={{ fontSize: '4rem' }}></i>
                <h5 className="card-title text-muted mt-3">No Workouts Found</h5>
                <p className="card-text text-muted">Create your first workout plan to get started.</p>
                <button className="btn btn-danger">
                  <i className="bi bi-plus-circle me-1"></i>Create Your First Workout
                </button>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-danger">
                      <tr>
                        <th className="border-0 fw-semibold">#</th>
                        <th className="border-0 fw-semibold">Workout Name</th>
                        <th className="border-0 fw-semibold">Description</th>
                        <th className="border-0 fw-semibold text-center">Duration</th>
                        <th className="border-0 fw-semibold text-center">Difficulty</th>
                        <th className="border-0 fw-semibold">Created Date</th>
                        <th className="border-0 fw-semibold text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workouts.map((workout, index) => (
                        <tr key={workout.id} className="align-middle">
                          <td className="fw-semibold text-muted">{index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-heart-pulse text-danger me-2"></i>
                              <span className="fw-semibold">{workout.name}</span>
                            </div>
                          </td>
                          <td className="text-muted">{workout.description}</td>
                          <td className="text-center">
                            <span className="badge bg-warning text-dark">{workout.duration} min</span>
                          </td>
                          <td className="text-center">
                            <span className={`badge ${
                              workout.difficulty === 'Beginner' ? 'bg-success' :
                              workout.difficulty === 'Intermediate' ? 'bg-warning text-dark' :
                              workout.difficulty === 'Advanced' ? 'bg-danger' : 'bg-secondary'
                            }`}>
                              {workout.difficulty}
                            </span>
                          </td>
                          <td>
                            <small className="text-muted">
                              {new Date(workout.created_at).toLocaleDateString()}
                            </small>
                          </td>
                          <td className="text-center">
                            <div className="btn-group btn-group-sm" role="group">
                              <button className="btn btn-outline-danger btn-sm">
                                <i className="bi bi-eye"></i>
                              </button>
                              <button className="btn btn-outline-secondary btn-sm">
                                <i className="bi bi-play-circle"></i>
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

export default Workouts;
