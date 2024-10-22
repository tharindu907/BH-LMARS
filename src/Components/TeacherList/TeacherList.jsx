import React, { useState, useEffect } from 'react';
import './TeacherList.css';
import searchIcon from '../Assets/serchicon.png'; // Replace with correct path to search icon

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  
  useEffect(() => {
    // Fetch the list of teachers from the backend
    fetch('/api/teachers')  // Replace with the actual API endpoint
      .then(res => res.json())
      .then(data => setTeachers(data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubjectFilter = (e) => {
    setSelectedSubject(e.target.value);
  };

  // Filter teachers based on search query and subject filter
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || teacher.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="tl-teacher-list">
      {/* Search Bar */}
      <div className="tl-window-search">
        <div className="tl-search-bar">
          <input
            type="text"
            className="tl-search-input"
            placeholder="Search Teacher"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="tl-search-button">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
      </div>

      {/* Filter by Subject */}
      <div className="tl-window-filter">
        <div className="tl-filters">
          <div className="tl-filter-group">
            <label htmlFor="tl-subject-filter">Subject</label>
            <select id="tl-subject-filter" value={selectedSubject} onChange={handleSubjectFilter}>
              <option value="All">All</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teacher List Table */}
      <div className="tl-window">
        <div className="tl-teacher-table">
          <table>
            <thead>
              <tr>
                <th>Teacher ID</th>
                <th>Teacher Name</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map(teacher => (
                  <tr key={teacher.id}>
                    <td>{teacher.id}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.subject}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No teachers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
