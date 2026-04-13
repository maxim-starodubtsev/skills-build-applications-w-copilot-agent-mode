import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/users/`;
        
        console.log('Fetching users from URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Users API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Users data:', usersData);
        
        setUsers(Array.isArray(usersData) ? usersData : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading users...</span>
          </div>
          <p className="mt-3 text-muted">Loading users...</p>
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
              <i className="bi bi-exclamation-triangle me-2"></i>Error Loading Users
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
            <h1 className="h2 fw-bold text-info mb-0">
              <i className="bi bi-person-circle me-2"></i>Users
            </h1>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary">
                <i className="bi bi-funnel me-1"></i>Filter
              </button>
              <button className="btn btn-info">
                <i className="bi bi-person-plus me-1"></i>Add User
              </button>
            </div>
          </div>

          {users.length === 0 ? (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-person-circle text-muted" style={{ fontSize: '4rem' }}></i>
                <h5 className="card-title text-muted mt-3">No Users Found</h5>
                <p className="card-text text-muted">Start by adding users to the fitness platform.</p>
                <button className="btn btn-info">
                  <i className="bi bi-person-plus me-1"></i>Add Your First User
                </button>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-info">
                      <tr>
                        <th className="border-0 fw-semibold">#</th>
                        <th className="border-0 fw-semibold">User</th>
                        <th className="border-0 fw-semibold">Email</th>
                        <th className="border-0 fw-semibold">Full Name</th>
                        <th className="border-0 fw-semibold">Join Date</th>
                        <th className="border-0 fw-semibold text-center">Status</th>
                        <th className="border-0 fw-semibold text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id} className="align-middle">
                          <td className="fw-semibold text-muted">{index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar-circle bg-info text-white me-3 d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                                {(user.username || user.first_name || 'U').charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="fw-semibold">{user.username}</div>
                                <small className="text-muted">ID: {user.id}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <a href={`mailto:${user.email}`} className="text-decoration-none">
                              {user.email}
                            </a>
                          </td>
                          <td>
                            {user.first_name && user.last_name
                              ? `${user.first_name} ${user.last_name}`
                              : <span className="text-muted">Not provided</span>
                            }
                          </td>
                          <td>
                            <small className="text-muted">
                              {new Date(user.date_joined).toLocaleDateString()}
                            </small>
                          </td>
                          <td className="text-center">
                            <span className="badge bg-success">Active</span>
                          </td>
                          <td className="text-center">
                            <div className="btn-group btn-group-sm" role="group">
                              <button className="btn btn-outline-info btn-sm">
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

export default Users;
