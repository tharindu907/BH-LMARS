import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ClassPayments.css';

const defaultClass = {
  classid: '',
  subject: '',
  teacher: '',
  grade: '',
  medium: ''
}

const ClassPayments = () => {
  const [details, setDetails] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentClass, setCurrentClass] = useState(defaultClass);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const handleSearch = async () => {
    try {
      const responseForClassDetails = await axios.get(`http://localhost:5000/class/get/classdetails/${searchId}`);
      if (!responseForClassDetails.data) {
        setErrorMessage('Invalid ClassID');
        setCurrentClass(defaultClass);
      } else {
        setErrorMessage('');
        setCurrentClass({
          classid: responseForClassDetails.data.classdetails._id,
          subject: responseForClassDetails.data.classdetails.subject,
          grade: responseForClassDetails.data.classdetails.grade,
          medium: responseForClassDetails.data.classdetails.medium,
          teacher: responseForClassDetails.data.teacherName
        });
      }

      const monthnumber = monthNumber(month);

      const responseForStudentList = await axios.post('http://localhost:5000/studentsInClass/get/allstudentpayment', {
        searchId,
        year,
        monthnumber
      });

      if (!responseForStudentList.data) {
        setDetails([]);
      } else {
        setErrorMessage('');
        setDetails(responseForStudentList.data);
      }
    } catch (error) {
      console.error('Error fetching class data:', error);
      setErrorMessage('Server error occurred');
      setCurrentClass(defaultClass);
    }
  }; 
  
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  }

  const monthNumber = (monthName) => {
    for (let key in months) {
      if (months[key] === monthName) {
        return key;
      }
    }
    return null;
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="class-payments">
      
      {/* Search Bar Container */}
      <div className="window">
        
        <div className="payment-search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Enter ClassID"
            value={searchId}
            onChange = {(e) => setSearchId(e.target.value)}
          />
        </div>
      </div>

    
      <div className="window">
        <div className="filters">

          <div className="filter-group">
            <label htmlFor="month">Month</label>
            <select id="month" value={month} onChange={handleMonthChange}>
              <option value="All">All</option>
              {Object.values(months).map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="" disabled>
                Select Year
              </option>
              {["2023", "2024"].map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSearch}>View</button>
        </div>
      </div>

      {errorMessage && <div className="error">{errorMessage}</div>}

      {!errorMessage && (
        <form>
          {/* Class Details Bar Container */}
          <div className="window">
            <div className="class-details-bar">
              <span className="class-info">
                ClassID: {currentClass.classid} | Subject: {currentClass.subject} | Grade: {currentClass.grade} | Medium: {currentClass.medium} | Teacher: {currentClass.teacher}
              </span>              
              <Link to="/admin/class/payments" className="view-details-button">
                View Details
              </Link>
            </div>
          </div>

          {/* Payments Table Container */}
          <div className="window">
            
            <div className="payments-table">
              <table>
                <thead>
                  <tr>
                    <th>StudentID</th>
                    <th>Payment Status</th>                
                  </tr>
                </thead>
                <tbody>
                  {details.map((student, index) => (
                    <tr key={index}>
                      <td>{student.studentId}</td>
                      <td>{student.paymentStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      )}  
      
    </div>
  );
};

export default ClassPayments;