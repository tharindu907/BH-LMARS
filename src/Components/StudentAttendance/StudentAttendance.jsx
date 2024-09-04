import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import serchIcon from '../Assets/serchicon.png';
import './StudentAttendance.css';

const StudentAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  const handleSearch = (e) => {
    // Logic to handle search and fetch the student details and attendance data
  };

  return (
    <div className="student-attendance">
      
      {/* Search Bar Window */}
      <div className="window">
        <div className="attendance-search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search Student"
          />
          <button className="search-button">
            <img src={serchIcon} alt="Search" />
          </button>
        </div>
      </div>

      {/* Student Details Bar Window */}
      <div className="window">
        <div className="student-details-bar">
          <span className="student-info">Student ID: 123456 | Student name: John Doe</span>
          <Link to="/admin/student/details" className="view-details-button">
            View Details
          </Link>
        </div>
      </div>

      {/* Filters Window */}
      <div className="window">
        <div className="filters">
          <div className="filter-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject">
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Sinhala">Sinhala</option>
              </select>
          </div>
    
          <div className="filter-group">
              <label htmlFor="grade">Grade</label>
              <select id="grade">
                  <option value="6">Grade 6</option>
                  <option value="7">Grade 7</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
              </select>
          </div>

          <div className="filter-group">
              <label htmlFor="teacher">Teacher</label>
              <select id="teacher">
                  <option value="Nadeera Gunarathna">Nadeera Gunarathna</option>
                  <option value="Kasuni Bhagya">Kasuni Bhagya</option>
                  <option value="Anushani Pathirana">Anushani Pathirana</option>
                  <option value="Prasanna Silva">Prasanna Silva</option>
                  <option value="Pawan Karunarathna">Pawan Karunarathna</option>
              </select>
          </div>

          <div className="filter-group">
              <label htmlFor="attend-date">Attend Date</label>
              <input type="date" id="attend-date" />
          </div>

          <button>View Attendance</button>
        </div>
      </div>

      {/* Attendance Table Window */}
      <div className="window">
        <div className="attendance-table">
          <table>
            <thead>
              <tr>
                <th>Attend Time</th>
                <th>Mark By</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>00:00:00</td>
                <td>Staff member</td>
                <td>
                  <input type="checkbox" />
                  Present
                </td>
                <td>
                  <button className="change-attendance-button">Change Attendance</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons Window */}
      <div className="button-window">
        <div className="action-buttons">
          <Link to="/admin/student/payments">
            <button>View Payments</button>
          </Link>
          <button>Save Changes</button>
        </div>
      </div>
      
    </div>
  );
};

export default StudentAttendance;
