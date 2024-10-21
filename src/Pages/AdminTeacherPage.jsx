import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';
import TeacherRegistration from '../Components/TeacherRegistration/TeacherRegistration';
import TeacherDetails from '../Components/TeacherDetails/TeacherDetails';
import TeacherClass from '../Components/TeacherClass/TeacherClass';
import registrationIcon from '../Components/Assets/registration-icon.png'
import detailsIcon from '../Components/Assets/details-icon.png'
import classIcon from '../Components/Assets/class-icon.png'
import listIcon from '../Components/Assets/listIcon.png'
import TeacherList from '../Components/TeacherList/TeacherList';
import './AdminTeacherPage.css';




const AdminTeacherPage = () => {
    return (
      <div className="admin-teacher-page">
        <NavigationBar />
        <Dashboard />
        <div className="teacher-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h2>Home</h2>
                  <div className="teacher-management-grid">
                    <Link to="/admin/teacher/registration" className="teacher-management-card">
                      <img src={registrationIcon} alt="Registration" />
                      <div className="t-card-title">Registration</div>
                    </Link>
                    <Link to="/admin/teacher/details" className="teacher-management-card">
                      <img src={detailsIcon} alt="Details" />
                      <div className="t-card-title">Details</div>
                    </Link>
                    <Link to="/admin/teacher/class" className="teacher-management-card">
                      <img src={classIcon} alt="Class" />
                      <div className="t-card-title">Class</div>
                    </Link>
                    <Link to="/admin/teacher/list" className="teacher-management-card">
                      <img src={listIcon} alt="List" />
                      <div className="t-card-title">List</div>
                    </Link>
                  </div>
                </>
              }
            />
            <Route path="registration" element={<TeacherRegistration />} />
            <Route path="details" element={<TeacherDetails />} />
            <Route path="class" element={<TeacherClass />} />
            <Route path="list" element={<TeacherList />} />
          </Routes>
        </div>
      </div>
    );
  };

export default AdminTeacherPage