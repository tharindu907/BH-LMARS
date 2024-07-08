import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';
import attendanceIcon from '../Components/Assets/attendance-icon.png'
import registrationIcon from '../Components/Assets/registration-icon.png'
import detailsIcon from '../Components/Assets/details-icon.png'
import paymentsIcon from '../Components/Assets/payments-icon.png'
import classIcon from '../Components/Assets/class-icon.png'
import './AdminStudentPage.css'; // Import the CSS file

const AdminStudentPage = () => {
  return (
    <div className="admin-student-page">
      <NavigationBar />
      <Dashboard />
      <div className="content">
        <h1>Student Management</h1>
        <div className="student-management-grid">
          <Link to="/admin/student/attendance" className="management-card">
            <img src={attendanceIcon} alt="Attendance" />
            <div className="card-title">Attendance</div>
          </Link>
          <Link to="/admin/student/registration" className="management-card">
            <img src={registrationIcon} alt="Registration" />
            <div className="card-title">Registration</div>
          </Link>
          <Link to="/admin/student/details" className="management-card">
            <img src={detailsIcon} alt="Details" />
            <div className="card-title">Details</div>
          </Link>
          <Link to="/admin/student/payments" className="management-card">
            <img src={paymentsIcon} alt="Payments" />
            <div className="card-title">Payments</div>
          </Link>
          <Link to="/admin/student/class" className="management-card">
            <img src={classIcon} alt="Class" />
            <div className="card-title">Class</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentPage;
