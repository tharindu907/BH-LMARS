import React, { useEffect, useState }  from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './AdminPage.css'; 
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';
import AdminStudentPage from './AdminStudentPage';
import AdminTeacherPage from './AdminTeacherPage';
import AdminClassesPage from './AdminClassesPage';
import AdminStaffPage from './AdminStaffPage';
import axios from 'axios';

const AdminPage = () => {
  const location = useLocation();
  const path = location.pathname.split('/').pop();
  const [studentCounts, setStudentCounts] = useState({ male: 0, female: 0 });
  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0);

  useEffect(() => {
    const fetchStudentCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/student/get/malefemalecount');
        setStudentCounts(response.data);
      } catch (err) {
        console.error('Failed to fetch student counts:', err);
      }
    };

    const fetchTeacherCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/get/teachercount');
        setTeacherCount(response.data);
      } catch (err) {
        console.error('Failed to fetch teacher counts:', err);
      }
    };

    const fetchClassCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/class/get/classcount');
        setClassCount(response.data);
      } catch (err) {
        console.error('Failed to fetch class counts:', err);
      }
    };

    fetchStudentCounts();
    fetchTeacherCounts();
    fetchClassCounts();
  }, [location.pathname]); // location.pathname enables to update the data from backend when the user navigates to different pages. Unless the data is updated when the page is mounted

  const getTitle = () => {
    switch (path) {
      case 'admin':
        return 'Dashboard';
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
        return '';
    }
  };

  const showSummaryGrid = () => {
    return path === '' || path === 'dashboard' || path === 'admin';
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
                <span className="main-title">Students</span>
                <span className="sub-title"> | Male</span>
              </div>
              <div className="summary-number">{studentCounts.male}</div>
            </div>

            <div className="summary-card">
              <div className="summary-title">
                <span className="main-title">Students</span>
                <span className="sub-title"> | Female</span>
              </div>
              <div className="summary-number">{studentCounts.female}</div>
            </div>

            <div className="summary-card">
              <div className="summary-title">
                <span className="main-title">Teachers</span>
              </div>
              <div className="summary-number">{teacherCount}</div>
            </div>

            <div className="summary-card">
              <div className="summary-title">
                <span className="main-title">Classes</span>
              </div>
              <div className="summary-number">{classCount}</div>
            </div>

          </div>
        )}
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="dashboard" element={<div />} />
          <Route path="student/*" element={<AdminStudentPage />} />
          <Route path="teacher/*" element={<AdminTeacherPage />} />
          <Route path="classes/*" element={<AdminClassesPage />} />
          <Route path="staff/*" element={<AdminStaffPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;