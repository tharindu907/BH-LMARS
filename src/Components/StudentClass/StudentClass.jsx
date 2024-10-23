import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../Assets/serchicon.png';
import axios from 'axios';
import './StudentClass.css';

const defaultClass = {
  classid: '',
  subject: '',
  teacher: '',
  grade: '',
  medium: ''
}

const StudentClass = () => {
  const [classData, setClassData] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentClass, setCurrentClass] = useState(defaultClass);
  const [year, setYear] = useState('');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentId, setNewStudentId] = useState('');

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

      const responseForStudentList = await axios.post('http://localhost:5000/studentsInClass/get/studentsbyclassid', {
        searchId,
        year
      });

      if (!responseForStudentList.data) {
        setClassData([]);
      } else {
        setErrorMessage('');
        setClassData(responseForStudentList.data);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      setErrorMessage('Server error occurred');
      setCurrentClass(defaultClass);
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/studentsInClass/post/newstudentstoclass', {
        searchId,
        year,
        newStudentId
      });

      if (response.data) {
        setNewStudentId('');
        setShowAddStudentModal(false);
        setErrorMessage('');
      } else {
        setErrorMessage('Error adding student');
      }
    } catch (error) {
      console.error('Error adding student:', error);
      setErrorMessage('Server error occurred while adding student');
    }
  };

  return (
    <div className="student-class">
      {/* Search Bar Container */}
      <div className="window">
        <div className="class-search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search Class"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        
        <div className="class-search-bar">
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
              <Link to="/admin/class/view" className="view-details-button">
                More Details
              </Link>
            </div>
          </div>

          {/* Class List Table Container */}
          <div className="window">
            <div className="class-table">
              <table>
                <thead>
                  <tr>
                    <th>StudentID</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.map((classRow, index) => (
                    <tr key={index}>
                      <td>{classRow.studentId}</td>
                      <td>{classRow.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons Container */}
          <div className="button-window">
            <div className="action-buttons">
              <Link to="/admin/class/payments">
                <button>View Payments</button>
              </Link>
              <Link to="/admin/class/attendance">
                <button>View Attendance</button>
              </Link>
            </div>
          </div>

          {/* Add Student Button */}
          <div className="button-window">
            <div className="action-buttons">  
              <button onClick={(e) => { 
                e.preventDefault(); // Prevent form submission
                setShowAddStudentModal(true); 
              }}>
                Add Student
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddStudentModal(false)}>
              &times;
            </span>
            <h2>Add Student</h2>
            <input
              type="text"
              placeholder="Enter Student ID"
              value={newStudentId}
              onChange={(e) => setNewStudentId(e.target.value)}
            />
            <button onClick={handleAddStudent}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentClass;
