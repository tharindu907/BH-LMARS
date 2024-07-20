import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';
import registrationIcon from '../Components/Assets/registration-icon.png'
import detailsIcon from '../Components/Assets/details-icon.png'
import paymentsIcon from '../Components/Assets/payments-icon.png'
import timetableIcon from '../Components/Assets/timetable-icon.png'
import './AdminClassesPage.css'; // Import the CSS file

const AdminClassesPage = () => {
  return (
    <div className="admin-classes-page">
      <NavigationBar />
      <Dashboard />
      <div className="classes-content">
        <h2>Home</h2>
        <div className="classes-management-grid">
          <Link to="/admin/classes/registration" className="classes-management-card">
            <img src={registrationIcon} alt="Registration" />
            <div className="c-card-title">Registration</div>
          </Link>
          <Link to="/admin/classes/details" className="classes-management-card">
            <img src={detailsIcon} alt="Details" />
            <div className="c-card-title">Details</div>
          </Link>
          <Link to="/admin/classes/payments" className="classes-management-card">
            <img src={paymentsIcon} alt="Payments" />
            <div className="c-card-title">Payments</div>
          </Link>
          <Link to="/admin/classes/timetable" className="classes-management-card">
            <img src={timetableIcon} alt="Timetable" />
            <div className="c-card-title">Timetable</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminClassesPage;
