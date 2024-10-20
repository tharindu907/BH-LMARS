import React from 'react';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';

function StudentPage() {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <NavigationBar/>
      <Dashboard />
    </div>
  );
}

export default StudentPage;
