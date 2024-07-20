import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';
import StaffRegistration from '../Components/StaffRegistration/StaffRegistration';
import registrationIcon from '../Components/Assets/registration-icon.png'
import detailsIcon from '../Components/Assets/details-icon.png'
import adminIcon from '../Components/Assets/admin-icon.png'
import './AdminStaffPage.css';



const AdminStaffPage = () => {
    return (
      <div className="admin-staff-page">
        <NavigationBar />
        <Dashboard />
        <div className="staff-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h2>Home</h2>
                  <div className="staff-management-grid">
                    <Link to="/admin/staff/registration" className="staff-management-card">
                      <img src={registrationIcon} alt="Registration" />
                      <div className="st-card-title">Registration</div>
                    </Link>
                    <Link to="/admin/staff/details" className="staff-management-card">
                      <img src={detailsIcon} alt="Details" />
                      <div className="st-card-title">Details</div>
                    </Link>
                    <Link to="/admin/staff/admin" className="staff-management-card">
                      <img src={adminIcon} alt="Admin Privilage" />
                      <div className="st-card-title">Admin Privilage</div>
                    </Link>
                  </div>
                </>
              }
            />
            <Route path="registration" element={<StaffRegistration />} />
          </Routes>
        </div>
      </div>
    );
  };

export default AdminStaffPage
