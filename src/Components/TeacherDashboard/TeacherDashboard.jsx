import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TeacherDashboard.css';

// Import icons from Assets folder
import dashboardIcon from '../Assets/dashboard-icon.png';
import studentIcon from '../Assets/student-icon.png';
import classesIcon from '../Assets/classes-icon.png';
import logoutIcon from '../Assets/logout-icon.png';
import dropdownIcon from '../Assets/dropdown_icon.png'; // Add your dropdown icon here

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarVisible, setSidebarVisible] = useState(true); // State to toggle sidebar
  const dropdownRef = useRef(); // Reference for dropdown icon

  const isActive = (path) => {
    if (path === '/teacher') {
      return location.pathname === '/teacher' || location.pathname.startsWith('/teacher/teacherdashboard');
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
        <button className={`dashboard-item ${isActive('/teacher') ? 'active' : ''}`} onClick={() => navigate('/teacher')}>
          <img src={dashboardIcon} alt="Dashboard" className="icon" />
          Dashboard
        </button>
        <button className={`dashboard-item ${isActive('/teacher/student') ? 'active' : ''}`} onClick={() => navigate('/teacher/student')}>
          <img src={studentIcon} alt="Student" className="icon" />
          Student
        </button>
        <button className={`dashboard-item ${isActive('/teacher/classes') ? 'active' : ''}`} onClick={() => navigate('/teacher/classes')}>
          <img src={classesIcon} alt="Classes" className="icon" />
          Classes
        </button>
        <button className="dashboard-item" onClick={() => navigate('/')}>
          <img src={logoutIcon} alt="Log out" className="icon" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default TeacherDashboard;
