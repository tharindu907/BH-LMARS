import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './TeacherPage.css'; // Import the TeacherPage CSS file
import NavigationBar from '../Components/NavigationBar/NavigationBar'; // Assuming NavigationBar is shared
import TeacherClassesPage from './TeacherClassesPage'; // Import any relevant pages
import TeacherStudentPage from './TeacherStudentPage';
import axios from 'axios';
import TeacherDashboard from '../Components/TeacherDashboard/TeacherDashboard';

const TeacherPage = () => {
  const location = useLocation();
  const path = location.pathname.split('/').pop();

  const [studentCounts, setStudentCounts] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);

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
        return 'Dashboard';
      case 'classes':
        return 'Classes';
      case 'staff':
        return 'Staff';
      default:
        return '';
    }
  };

  const showSummaryGrid = () => {
    return path === '' || path === 'teacherdashboard' || path === 'teacher';
  };

  return (
    <div className="teacher-page">
      {/* Navigation bar shared across pages */}
      <NavigationBar />
      <TeacherDashboard />

      {/* Main Content Area */}
      <div className="t-content">
        <h1>{getTitle()}</h1>
        {showSummaryGrid() && <div>Welcome to Teacher Dashboard</div>}

        {/* Summary Grid (only on teacher dashboard) */}
        {showSummaryGrid() && (
          <div className="t-summary-grid">
            <div className="t-summary-card">
              <div className="t-summary-title">
                <span className="t-main-title">Students</span>
                <span className="t-sub-title"> | Male</span>
              </div>
              <div className="t-summary-number">{studentCounts.male}</div>
            </div>

            <div className="t-summary-card">
              <div className="t-summary-title">
                <span className="t-main-title">Students</span>
                <span className="t-sub-title"> | Female</span>
              </div>
              <div className="t-summary-number">{studentCounts.female}</div>
            </div>

            <div className="t-summary-card">
              <div className="t-summary-title">
                <span className="t-main-title">Teachers</span>
              </div>
              <div className="t-summary-number">{teacherCount}</div>
            </div>

            <div className="t-summary-card">
              <div className="t-summary-title">
                <span className="t-main-title">Classes</span>
              </div>
              <div className="t-summary-number">{classCount}</div>
            </div>
          </div>
        )}

        {/* Routes to navigate between teacher-related sections */}
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="teacherdashboard" element={<div />} />
          <Route path="student/*" element={<TeacherStudentPage />} />
          <Route path="classes/*" element={<TeacherClassesPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default TeacherPage;
