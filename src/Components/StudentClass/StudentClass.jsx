import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../Assets/serchicon.png';
import './StudentClass.css';

const StudentClass = () => {
  const [classData, setClassData] = useState([]);

  const handleSearch = (e) => {
    // Logic to handle search and fetch the class details
  };

  const handleAddClass = () => {
    setClassData([...classData, { no: classData.length + 1, subject: '', grade: '', teacher: '' }]);
  };

  const handleRemoveClass = (index) => {
    const newClassData = [...classData];
    newClassData.splice(index, 1);
    setClassData(newClassData);
  };

  const subjects = [
    "Mathematics", "English", "Science", "History", "Commerce", "Sinhala"
  ];

  const grades = [
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11"
  ];

  const teachers = [
    "Nadeera Gunarathna", "Kasuni Bhagya", "Anushani Pathirana", "Prasanna Silva", "Pawan Karunarathna"
  ];

  return (
    <div className="student-class">
      
      {/* Search Bar Container */}
      <div className="window">
        <div className="class-search-bar">
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
          <span className="class-info">Class ID: 001 | Class Name: Mathematics A</span>
          <Link to="/admin/class/view" className="view-details-button">
            View Class Details
          </Link>
        </div>
      </div>

      {/* Filters Container */}
      <div className="window">
        <div className="filters">
          <div className="filter-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject">
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
          </div>
    
          <div className="filter-group">
              <label htmlFor="grade">Grade</label>
              <select id="grade">
                {grades.map((grade, index) => (
                  <option key={index} value={grade}>{grade}</option>
                ))}
              </select>
          </div>

          <div className="filter-group">
              <label htmlFor="teacher">Teacher</label>
              <select id="teacher">
                {teachers.map((teacher, index) => (
                  <option key={index} value={teacher}>{teacher}</option>
                ))}
              </select>
          </div>

          <button>View Class</button>
        </div>
      </div>

      {/* Class List Table Container */}
      <div className="window">
        <div className="class-table">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Teacher</th>
                <th>
                  <button className="add-class-button" onClick={handleAddClass}>Add Class</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {classData.map((classRow, index) => (
                <tr key={index}>
                  <td>{classRow.no}</td>
                  <td>{classRow.subject}</td>
                  <td>{classRow.grade}</td>
                  <td>{classRow.teacher}</td>
                  <td>
                    <button className="remove-class-button" onClick={() => handleRemoveClass(index)}>
                      Remove Class
                    </button>
                  </td>
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
    </div>
  );
};

export default StudentClass;
