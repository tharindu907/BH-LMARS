import React from 'react';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';

function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <NavigationBar />
      <Dashboard />
    </div>
  );
}

export default AdminPage;
