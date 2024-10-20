import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

// Import icons from Assets folder
import dashboardIcon from '../Assets/dashboard-icon.png';
import studentIcon from '../Assets/student-icon.png';
import teacherIcon from '../Assets/teacher-icon.png';
import classesIcon from '../Assets/classes-icon.png';
import staffIcon from '../Assets/staff-icon.png';
import logoutIcon from '../Assets/logout-icon.png';
import dropdownIcon from '../Assets/dropdown_icon.png'; // Add your dropdown icon here

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarVisible, setSidebarVisible] = useState(true); // State to toggle sidebar
  const dropdownRef = useRef(); // Reference for dropdown icon

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname.startsWith('/admin/dashboard');
    }
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
    dropdownRef.current.classList.toggle('open'); // Toggle dropdown icon rotation
  };

  return (
    <div className={`dashboard-container ${isSidebarVisible ? '' : 'sidebar-hidden'}`}>
      <img
        ref={dropdownRef}
        className="dashboard-dropdown"
        onClick={toggleSidebar}
        src={dropdownIcon}
        alt="Toggle Sidebar"
      />
      <div className="dashboard">
        <button className={`dashboard-item ${isActive('/admin') ? 'active' : ''}`} onClick={() => navigate('/admin')}>
          <img src={dashboardIcon} alt="Dashboard" className="icon" />
          Dashboard
        </button>
        <button className={`dashboard-item ${isActive('/admin/student') ? 'active' : ''}`} onClick={() => navigate('/admin/student')}>
          <img src={studentIcon} alt="Student" className="icon" />
          Student
        </button>
        <button className={`dashboard-item ${isActive('/admin/teacher') ? 'active' : ''}`} onClick={() => navigate('/admin/teacher')}>
          <img src={teacherIcon} alt="Teacher" className="icon" />
          Teacher
        </button>
        <button className={`dashboard-item ${isActive('/admin/classes') ? 'active' : ''}`} onClick={() => navigate('/admin/classes')}>
          <img src={classesIcon} alt="Classes" className="icon" />
          Classes
        </button>
        <button className={`dashboard-item ${isActive('/admin/staff') ? 'active' : ''}`} onClick={() => navigate('/admin/staff')}>
          <img src={staffIcon} alt="Staff" className="icon" />
          Staff
        </button>
        <button className="dashboard-item" onClick={() => navigate('/')}>
          <img src={logoutIcon} alt="Log out" className="icon" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
