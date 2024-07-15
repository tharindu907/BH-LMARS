// src/Components/Dashboard/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Import icons from Assets folder
import dashboardIcon from '../Assets/dashboard-icon.png';
import studentIcon from '../Assets/student-icon.png';
import teacherIcon from '../Assets/teacher-icon.png';
import classesIcon from '../Assets/classes-icon.png';
import staffIcon from '../Assets/staff-icon.png';
import logoutIcon from '../Assets/logout-icon.png';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <button className="dashboard-item" onClick={() => navigate('/admin/dashboard')}>
        <img src={dashboardIcon} alt="Dashboard" className="icon" />
        Dashboard
      </button>
      <button className="dashboard-item" onClick={() => navigate('/admin/student')}>
        <img src={studentIcon} alt="Student" className="icon" />
        Student
      </button>
      <button className="dashboard-item" onClick={() => navigate('/admin/teacher')}>
        <img src={teacherIcon} alt="Teacher" className="icon" />
        Teacher
      </button>
      <button className="dashboard-item" onClick={() => navigate('/admin/classes')}>
        <img src={classesIcon} alt="Classes" className="icon" />
        Classes
      </button>
      <button className="dashboard-item" onClick={() => navigate('/admin/staff')}>
        <img src={staffIcon} alt="Staff" className="icon" />
        Staff
      </button>
      <button className="dashboard-item" onClick={() => navigate('/')}>
        <img src={logoutIcon} alt="Log out" className="icon" />
        Log out
      </button>
    </div>
  );
};

export default Dashboard;