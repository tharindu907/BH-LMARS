import React from 'react'
import { Link } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';
import registrationIcon from '../Components/Assets/registration-icon.png'
import detailsIcon from '../Components/Assets/details-icon.png'
import adminIcon from '../Components/Assets/admin-icon.png'
import './AdminStaffPage.css';


const AdminStaffPage = () => {
    return (
      <div className="admin-staff-page">
        <NavigationBar />
        <Dashboard />
        <div className="content">
          <h2>Home</h2>
          <div className="staff-management-grid">
            <Link to="/admin/staff/registration" className="management-card">
              <img src={registrationIcon} alt="Registration" />
              <div className="card-title">Registration</div>
            </Link>
            <Link to="/admin/staff/details" className="management-card">
              <img src={detailsIcon} alt="Details" />
              <div className="card-title">Details</div>
            </Link>
            <Link to="/admin/staff/admin" className="management-card">
              <img src={adminIcon} alt="Admin Privilage" />
              <div className="card-title">Admin Privilage</div>
            </Link>
          </div>
        </div>
      </div>
    );
  };

export default AdminStaffPage
