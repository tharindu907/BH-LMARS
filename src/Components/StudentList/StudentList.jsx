import React, { useState, useEffect } from 'react';
import './StudentList.css';
import serchIcon from '../Assets/serchicon.png';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  
  useEffect(() => {
    // Fetch the list of students from the backend
    fetch('/api/students')  // Replace with the actual API endpoint
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGradeFilter = (e) => {
    setSelectedGrade(e.target.value);
  };

  // Filter students based on search query and grade filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="sl-student-list">
      {/* Search Bar */}
      <div className="sl-window-search">
        <div className="sl-search-bar">
          <input
            type="text"
            className="sl-search-input"
            placeholder="Search Student"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="sl-search-button">
            <img src={serchIcon} alt="Search" />
          </button>
        </div>
      </div>

      {/* Filter by Grade */}
      <div className="sl-window-filter">
        <div className="sl-filters">
          <div className="sl-filter-group">
            <label htmlFor="sl-grade-filter">Grade</label>
            <select id="sl-grade-filter" value={selectedGrade} onChange={handleGradeFilter}>
              <option value="All">All</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="sl-window">
        <div className="sl-student-table">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.grade}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
