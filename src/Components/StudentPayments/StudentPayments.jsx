import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import serchIcon from '../Assets/serchicon.png';
import './StudentPayments.css';

const StudentPayments = () => {
  const [paymentsData, setPaymentsData] = useState([]);

  const handleSearch = (e) => {
    // Logic to handle search and fetch the student details and payments data
  };

  const months = [
    "January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", 
    "November", "December"
  ];

  return (
    <div className="student-payments">
      
      {/* Search Bar Container */}
      <div className="window">
        <div className="payment-search-bar">
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

      {/* Student Details Bar Container */}
      <div className="window">
        <div className="student-details-bar">
          <span className="student-info">Student ID: 123456 | Student name: John Doe</span>
          <Link to="/admin/student/payments" className="view-details-button">
            View Details
          </Link>
        </div>
      </div>

      {/* Filters Container */}
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
                  {/* Add more subjects as needed */}
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
              <label htmlFor="month">Month</label>
              <select id="month">
               {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
               ))}
              </select>
          </div>

          <button>View Payment</button>
        </div>
      </div>

      {/* Payments Table Container */}
      <div className="window">
        <div className="payments-table">
          <table>
            <thead>
              <tr>
                <th>Conducted Dates</th>
                <th>Present Dates</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Sample row; replace with dynamic content */}
              <tr>
                <td>3</td>
                <td>3</td>
                <td>
                  <input type="checkbox" />
                  Present
                </td>
                <td>
                  <button className="change-payment-button">Change Payment</button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons Container */}
      <div className="button-window">
        <div className="action-buttons">
          <Link to="/admin/student/attendance">
            <button>View Attendance</button>
          </Link>
          <button>Free Card Activate</button>
          <button>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default StudentPayments;
