import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';
import StudentRegistration from '../Components/StudentRegistration/StudentRegistration';
import StudentAttendance from '../Components/StudentAttendance/StudentAttendance';
import attendanceIcon from '../Components/Assets/attendance-icon.png';
import registrationIcon from '../Components/Assets/registration-icon.png';
import detailsIcon from '../Components/Assets/details-icon.png';
import paymentsIcon from '../Components/Assets/payments-icon.png';
import classIcon from '../Components/Assets/class-icon.png';
import './AdminStudentPage.css';


const AdminStudentPage = () => {
  return (
    <div className="admin-student-page">
      <NavigationBar />
      <Dashboard />
      <div className="student-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Home</h2>
                <div className="student-management-grid">
                  <Link to="attendance" className="student-management-card">
                    <img src={attendanceIcon} alt="Attendance" />
                    <div className="s-card-title">Attendance</div>
                  </Link>
                  <Link to="registration" className="student-management-card">
                    <img src={registrationIcon} alt="Registration" />
                    <div className="s-card-title">Registration</div>
                  </Link>
                  <Link to="details" className="student-management-card">
                    <img src={detailsIcon} alt="Details" />
                    <div className="s-card-title">Details</div>
                  </Link>
                  <Link to="payments" className="student-management-card">
                    <img src={paymentsIcon} alt="Payments" />
                    <div className="s-card-title">Payments</div>
                  </Link>
                  <Link to="class" className="student-management-card">
                    <img src={classIcon} alt="Class" />
                    <div className="s-card-title">Class</div>
                  </Link>
                </div>
              </>
            }
          />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="registration" element={<StudentRegistration />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminStudentPage;
