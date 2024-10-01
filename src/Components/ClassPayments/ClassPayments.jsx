import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../Assets/serchicon.png';
import './ClassPayments.css';

const ClassPayments = () => {
  const [paymentsData, setPaymentsData] = useState([]);

  const handleSearch = (e) => {
    // Logic to handle search and fetch the class details and payments data
  };

  const months = [
    "January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", 
    "November", "December"
  ];

  return (
    <div className="class-payments">
      
      {/* Search Bar Container */}
      <div className="window">
        <div className="payment-search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search Class"
          />
          <button className="search-button">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
      </div>

      {/* Class Details Bar Container */}
      <div className="window">
        <div className="class-details-bar">
          <span className="class-info">Class ID: ABC123 | Class name: Advanced Mathematics</span>
          <Link to="/admin/class/payments" className="view-details-button">
            View Details
          </Link>
        </div>
      </div>

      {/* Filters Container */}
      <div className="window">
        <div className="filters">
          <div className="filter-group">
              <label htmlFor="month">Month</label>
              <select id="month">
                  <option value="All">All</option> {/* Add the "All" option */}
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
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons Container */}
      <div className="button-window">
        <div className="action-buttons">
          <Link to="/admin/class/attendance">
            <button>View Attendance</button>
          </Link>
          <button>Free Card Activate</button>
          <button>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default ClassPayments;
