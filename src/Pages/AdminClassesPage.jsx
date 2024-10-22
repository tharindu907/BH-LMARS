import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import Dashboard from '../Components/Dashboard/Dashboard';
import registrationIcon from '../Components/Assets/registration-icon.png';
import detailsIcon from '../Components/Assets/details-icon.png';
import paymentsIcon from '../Components/Assets/payments-icon.png';
import timetableIcon from '../Components/Assets/timetable-icon.png';
import listIcon from '../Components/Assets/listIcon.png'
import TimeTable from '../Components/TimeTable/TimeTable'; // Import the TimeTable component
import './AdminClassesPage.css';
import ClassRegistration from '../Components/ClassRegistration/ClassRegistration';
import ClassDetails from '../Components/ClassDetails/ClassDetails';
import ClassPayments from '../Components/ClassPayments/ClassPayments';
import ClassList from '../Components/ClassList/ClassList';

const AdminClassesPage = () => {
  return (
    <div className="admin-classes-page">
      <NavigationBar />
      <Dashboard />
      <div className="classes-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Home</h2>
                <div className="classes-management-grid">
                  <Link to="registration" className="classes-management-card">
                    <img src={registrationIcon} alt="Registration" />
                    <div className="c-card-title">Registration</div>
                  </Link>
                  <Link to="details" className="classes-management-card">
                    <img src={detailsIcon} alt="Details" />
                    <div className="c-card-title">Details</div>
                  </Link>
                  <Link to="payments" className="classes-management-card">
                    <img src={paymentsIcon} alt="Payments" />
                    <div className="c-card-title">Payments</div>
                  </Link>
                  <Link to="timetable" className="classes-management-card">
                    <img src={timetableIcon} alt="Timetable" />
                    <div className="c-card-title">Timetable</div>
                  </Link>
                  <Link to="list" className="classes-management-card">
                    <img src={listIcon} alt="List" />
                    <div className="c-card-title">List</div>
                  </Link>
                </div>
              </>
            }
          />
          <Route path="registration" element={<ClassRegistration />} />
          <Route path="details" element={<ClassDetails />} />
          <Route path="payments" element={<ClassPayments />} /> 
          <Route path="timetable" element={<TimeTable />} />
          <Route path="list" element={<ClassList />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default AdminClassesPage;