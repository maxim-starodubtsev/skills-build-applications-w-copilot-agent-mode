import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
        
        console.log('Fetching activities from URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Activities API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Activities data:', activitiesData);
        
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading activities...</span>
          </div>
          <p className="mt-3 text-muted">Loading activities...</p>
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
              <i className="bi bi-exclamation-triangle me-2"></i>Error Loading Activities
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
            <h1 className="h2 fw-bold text-primary mb-0">
              <i className="bi bi-activity me-2"></i>Activities
            </h1>
            <button className="btn btn-primary">
              <i className="bi bi-plus-circle me-1"></i>Add Activity
            </button>
          </div>

          {activities.length === 0 ? (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-activity text-muted" style={{ fontSize: '4rem' }}></i>
                <h5 className="card-title text-muted mt-3">No Activities Found</h5>
                <p className="card-text text-muted">Start by adding your first fitness activity.</p>
                <button className="btn btn-primary">
                  <i className="bi bi-plus-circle me-1"></i>Create Your First Activity
                </button>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="border-0 fw-semibold">#</th>
                        <th className="border-0 fw-semibold">Activity Name</th>
                        <th className="border-0 fw-semibold">Description</th>
                        <th className="border-0 fw-semibold">Created Date</th>
                        <th className="border-0 fw-semibold text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((activity, index) => (
                        <tr key={activity.id} className="align-middle">
                          <td className="fw-semibold text-muted">{index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-activity text-primary me-2"></i>
                              <span className="fw-semibold">{activity.name}</span>
                            </div>
                          </td>
                          <td className="text-muted">{activity.description}</td>
                          <td>
                            <small className="text-muted">
                              {new Date(activity.created_at).toLocaleDateString()}
                            </small>
                          </td>
                          <td className="text-center">
                            <div className="btn-group btn-group-sm" role="group">
                              <button className="btn btn-outline-primary btn-sm">
                                <i className="bi bi-eye"></i>
                              </button>
                              <button className="btn btn-outline-secondary btn-sm">
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

export default Activities;
