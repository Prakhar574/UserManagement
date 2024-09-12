import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Manage.css';

const ManageAccount = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, selectedUser);
      
      const updatedUsers = users.map(user => user._id === selectedUser._id ? selectedUser : user);
      setUsers(updatedUsers);
      setSelectedUser(null);
    } catch (err) {
      setError('Error updating user');
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
  
      const updatedUsers = users.filter(user => user._id !== id);
      setUsers(updatedUsers);
    } catch (err) {
      setError('Error deleting user');
    }
  };

  return (
    <div className="manage-account-container">
      <h2>Manage Accounts</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="edit-btn" onClick={() => handleSelectUser(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="edit-form">
          <h3>Edit User</h3>
          <input
            type="text"
            name="username"
            value={selectedUser.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={selectedUser.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={selectedUser.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button className="update-btn" onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default ManageAccount;
