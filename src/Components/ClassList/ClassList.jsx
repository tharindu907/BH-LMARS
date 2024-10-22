import React, { useState, useEffect } from 'react';
import './ClassList.css';
import serchIcon from '../Assets/serchicon.png';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedTeacher, setSelectedTeacher] = useState('All');

  useEffect(() => {
    // Fetch the list of classes from the backend
    fetch('/api/classes') // Replace with the actual API endpoint
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGradeFilter = (e) => {
    setSelectedGrade(e.target.value);
  };

  const handleTeacherFilter = (e) => {
    setSelectedTeacher(e.target.value);
  };

  // Filter classes based on search query, grade filter, and teacher filter
  const filteredClasses = classes.filter(cl => {
    const matchesSearch = cl.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || cl.grade === selectedGrade;
    const matchesTeacher = selectedTeacher === 'All' || cl.teacherName === selectedTeacher;
    return matchesSearch && matchesGrade && matchesTeacher;
  });

  return (
    <div className="cl-class-list">
      {/* Search Bar */}
      <div className="cl-window-search">
        <div className="cl-search-bar">
          <input
            type="text"
            className="cl-search-input"
            placeholder="Search Class"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="cl-search-button">
            <img src={serchIcon} alt="Search" className="cl-search-img" />
          </button>
        </div>
      </div>

      {/* Filters: Grade and Teacher */}
      <div className="cl-window-filter">
        <div className="cl-filters">
          {/* Grade Filter */}
          <div className="cl-filter-group">
            <label htmlFor="cl-grade-filter">Grade</label>
            <select id="cl-grade-filter" value={selectedGrade} onChange={handleGradeFilter}>
              <option value="All">All</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
            </select>
          </div>
          {/* Teacher Filter */}
          <div className="cl-filter-group">
            <label htmlFor="cl-teacher-filter">Teacher</label>
            <select id="cl-teacher-filter" value={selectedTeacher} onChange={handleTeacherFilter}>
              <option value="All">All</option>
              <option value="Mr. Smith">Mr. Nadeera Gunarathna</option>
              <option value="Ms. Johnson">Ms. Kasuni Bhagya</option>
              <option value="Mr. Lee">Mr. Tharindu Amarathunga</option>
              <option value="Ms. Davis">Ms. Roshani Senanayake</option>
            </select>
          </div>
        </div>
      </div>

      {/* Class List Table */}
      <div className="cl-window">
        <div className="cl-class-table">
          <table>
            <thead>
              <tr>
                <th>Class ID</th>
                <th>Class Name</th>
                <th>Grade</th>
                <th>Teacher Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.length > 0 ? (
                filteredClasses.map(cl => (
                  <tr key={cl.id}>
                    <td>{cl.id}</td>
                    <td>{cl.name}</td>
                    <td>{cl.grade}</td>
                    <td>{cl.teacherName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No classes found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassList;
