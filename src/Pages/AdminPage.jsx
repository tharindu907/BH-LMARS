import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';
import AdminStudentPage from './AdminStudentPage';
import './AdminPage.css'; // Import the CSS file

const AdminPage = () => {
  const location = useLocation();
  const path = location.pathname.split('/').pop();

  const getTitle = () => {
    switch (path) {
      case 'dashboard':
        return 'Dashboard';
      case 'student':
        return 'Student';
      case 'teacher':
        return 'Teacher';
      case 'classes':
        return 'Classes';
      case 'staff':
        return 'Staff';
      default:
        return 'Dashboard';
    }
  };

  const showSummaryGrid = () => {
    return path === 'dashboard' || path === 'admin';
  };

  return (
    <div className="admin-page">
      <NavigationBar />
      <Dashboard />
      <div className="content">
        <h1>{getTitle()}</h1>
        {showSummaryGrid() && <div>Welcome to Admin Dashboard</div>}
        {showSummaryGrid() && (
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-title">
                <span className="main-title">Student</span>
                <span className="sub-title"> | Male</span>
              </div>
              <div className="summary-number">50</div>
            </div>
            <div className="summary-card">
              <div className="summary-title">
                <span className="main-title">Student</span>
                <span className="sub-title"> | Female</span>
              </div>
              <div className="summary-number">60</div>
            </div>
            <div className="summary-card">
              <div className="summary-title">
                <span className="main-title">Teacher</span>
                <span className="sub-title"> | Male</span>
              </div>
              <div className="summary-number">20</div>
            </div>
            <div className="summary-card">
              <div className="summary-title">
                <span className="main-title">Teacher</span>
                <span className="sub-title"> | Female</span>
              </div>
              <div className="summary-number">30</div>
            </div>
            <div className="summary-card">
              <div className="summary-title">
                <span className="main-title">Classes</span>
                <span className="sub-title"> | Sinhala Medium</span>
              </div>
              <div className="summary-number">10</div>
            </div>
            <div className="summary-card">
              <div className="summary-title">
                <span className="main-title">Classes</span>
                <span className="sub-title"> | English Medium</span>
              </div>
              <div className="summary-number">15</div>
            </div>
          </div>
        )}
        <Routes>
          <Route path="dashboard" element={<div />} />
          <Route path="student" element={<AdminStudentPage />} />
          <Route path="teacher" element={<div>Manage Teachers</div>} />
          <Route path="classes" element={<div>Manage Classes</div>} />
          <Route path="staff" element={<div>Manage Staff</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
