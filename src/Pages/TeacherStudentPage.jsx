import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';
import StudentRegistration from '../Components/StudentRegistration/StudentRegistration';
import StudentAttendance from '../Components/StudentAttendance/StudentAttendance';
import attendanceIcon from '../Components/Assets/attendance-icon.png';
import registrationIcon from '../Components/Assets/registration-icon.png';
import detailsIcon from '../Components/Assets/details-icon.png';
import paymentsIcon from '../Components/Assets/payments-icon.png';
import classIcon from '../Components/Assets/class-icon.png';
import listIcon from '../Components/Assets/listIcon.png';
import StudentDetails from '../Components/StudentDetails/StudentDetails';
import StudentPayments from '../Components/StudentPayments/StudentPayments';
import StudentClass from '../Components/StudentClass/StudentClass';
import StudentList from '../Components/StudentList/StudentList';
import './TeacherStudentPage.css';
import TeacherDashboard from '../Components/TeacherDashboard/TeacherDashboard';

const TeacherStudentPage = () => {
  return (
    <div className="teacher-student-page">
      <NavigationBar />
      <TeacherDashboard />
      <div className="teacher-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Home</h2>
                <div className="teacher-management-grid">
                  <Link to="attendance" className="teacher-management-card">
                    <img src={attendanceIcon} alt="Attendance" />
                    <div className="s-card-title">Attendance</div>
                  </Link>
                  <Link to="registration" className="teacher-management-card">
                    <img src={registrationIcon} alt="Registration" />
                    <div className="s-card-title">Registration</div>
                  </Link>
                  <Link to="details" className="teacher-management-card">
                    <img src={detailsIcon} alt="Details" />
                    <div className="s-card-title">Details</div>
                  </Link>
                  <Link to="payments" className="teacher-management-card">
                    <img src={paymentsIcon} alt="Payments" />
                    <div className="s-card-title">Payments</div>
                  </Link>
                  <Link to="class" className="teacher-management-card">
                    <img src={classIcon} alt="Class" />
                    <div className="s-card-title">Class</div>
                  </Link>
                  <Link to="list" className="teacher-management-card">
                    <img src={listIcon} alt="List" />
                    <div className="s-card-title">List</div>
                  </Link>
                </div>
              </>
            }
          />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="registration" element={<StudentRegistration />} />
          <Route path="details" element={<StudentDetails />} />
          <Route path="payments" element={<StudentPayments />} />
          <Route path="class" element={<StudentClass />} />
          <Route path="list" element={<StudentList />} />
        </Routes>
      </div>
    </div>
  );
};

export default TeacherStudentPage
