import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';
import StaffRegistration from '../Components/StaffRegistration/StaffRegistration';
import registrationIcon from '../Components/Assets/registration-icon.png'
import detailsIcon from '../Components/Assets/details-icon.png'
import adminIcon from '../Components/Assets/admin-icon.png'
import listIcon from '../Components/Assets/listIcon.png'
import MembersList from '../Components/StaffDetails/StaffDetails';
import StaffList from '../Components/StaffList/StaffList';
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
                    {/*
                    <Link to="/admin/staff/memberlist" className="staff-management-card">
                      <img src={adminIcon} alt="Admin Privilage" />
                      <div className="st-card-title">Admin Privilage</div>
                    </Link>
                    */}
                    <Link to="/admin/staff/list" className="staff-management-card">
                      <img src={listIcon} alt="List" />
                      <div className="st-card-title">List</div>
                    </Link>
                  </div>
                </>
              }
            />
            <Route path="registration" element={<StaffRegistration />} />
            <Route path="details" element={<MembersList />} />
            <Route path="list" element={[<StaffList/>]} />
          </Routes>
        </div>
      </div>
    );
  };

export default AdminStaffPage
