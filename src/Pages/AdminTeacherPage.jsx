import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';
import TeacherRegistration from '../Components/TeacherRegistration/TeacherRegistration';
import registrationIcon from '../Components/Assets/registration-icon.png'
import detailsIcon from '../Components/Assets/details-icon.png'
import classIcon from '../Components/Assets/class-icon.png'
import './AdminTeacherPage.css';



const AdminTeacherPage = () => {
    return (
      <div className="admin-teacher-page">
        <NavigationBar />
        <Dashboard />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h2>Home</h2>
                  <div className="teacher-management-grid">
                    <Link to="/admin/teacher/registration" className="management-card">
                      <img src={registrationIcon} alt="Registration" />
                      <div className="card-title">Registration</div>
                    </Link>
                    <Link to="/admin/teacher/details" className="management-card">
                      <img src={detailsIcon} alt="Details" />
                      <div className="card-title">Details</div>
                    </Link>
                    <Link to="/admin/teacher/class" className="management-card">
                      <img src={classIcon} alt="Class" />
                      <div className="card-title">Class</div>
                    </Link>
                  </div>
                </>
              }
            />
            <Route path="registration" element={<TeacherRegistration />} />
          </Routes>
        </div>
      </div>
    );
  };

export default AdminTeacherPage
