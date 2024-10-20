import React from 'react';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';

function TeacherPage() {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <NavigationBar />
      <Dashboard />
    </div>
  );
}

export default TeacherPage;
