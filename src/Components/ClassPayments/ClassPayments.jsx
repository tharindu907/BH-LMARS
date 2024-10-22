import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../Assets/serchicon.png';
import './ClassPayments.css';

const ClassPayments = () => {
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [paymentList, setPaymentList] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  
  const months = [
    "January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", 
    "November", "December"
  ];

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setPaymentList(null);  // Reset the payment list when changing the month
  };

  const handlePaymentListClick = () => {
    setPaymentList(true);  // Show the payments list
  };

  const handleEditClick = () => {
    setIsEditable(true);  // Allow the payment list to be editable
  };

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
              <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                  <option value="All">All</option>
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
        {!paymentList ? (
          <div className="payments-table">
            <table>
              <thead>
                <tr>
                  {selectedMonth === 'All' ? (
                    <>
                      <th>Months</th>
                      <th>Conducted Periods</th>
                      <th>Payment Ratio</th>
                      <th>Payment Percentage</th>
                      <th>Mark by</th>
                      <th></th>
                    </>
                  ) : (
                    <>
                      <th>Conducted Date</th>
                      <th>Conducted Time</th>
                      <th>Payment Ratio</th>
                      <th>Payment Percentage</th>
                      <th>Mark by</th>
                      <th></th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Sample data; replace with dynamic content */}
                <tr>
                  {selectedMonth === 'All' ? (
                    <>
                      <td>January</td>
                      <td>10</td>
                      <td>80%</td>
                      <td>100%</td>
                      <td>Admin</td>
                      <td>
                        <button onClick={handlePaymentListClick}>View</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>01/01/2024</td>
                      <td>10:00 AM</td>
                      <td>75%</td>
                      <td>90%</td>
                      <td>Admin</td>
                      <td>
                        <button onClick={handlePaymentListClick}>Payments List</button>
                      </td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="payments-table">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Attend Time</th>
                  <th>Status</th>
                  <th>Mark by</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>ST123</td>
                  <td>10:15 AM</td>
                  <td>
                    <input type="checkbox" checked={true} disabled={!isEditable} />
                  </td>
                  <td>Admin</td>
                  <td>
                    <button onClick={handleEditClick} className="change-payment-button">
                      {isEditable ? "Save Changes" : "Change Payment"}
                    </button>
                  </td>
                </tr>
                {/* Add more rows dynamically based on your data */}
              </tbody>
            </table>
          </div>
        )}
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