import React, { useState, useEffect } from 'react';
import './StudentList.css';
import axios from 'axios';

const gradeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const StudentList = () => {
  const [studentList, setStudentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredList.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredList.length / rowsPerPage);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseforstudentlist =  await axios.get('http://localhost:5000/student/get/studentdetails');
        
        setStudentList(responseforstudentlist.data);
        setFilteredList(responseforstudentlist.data);

      } catch (error) {
        setErrorMessage('Server Error');
        console.error('Error fetching data:', error);        
      }
    };

    fetchData();
  }, []);

  const handleViewClick = () => {
    const filtered = studentList.filter((member) =>
      (name === '' || (member.first_name + ' ' + member.last_name).toLowerCase().includes(name.toLowerCase())) &&
      (grade === '' || String(member.grade) === String(grade))
      
    );
    setFilteredList(filtered);
    setCurrentPage(1);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="members-list-container">

      <div className="filter-box">

        <div className="filter-item">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter Name"
          />
        </div>

        <div className="filter-item">
          <label htmlFor="grade">Grade</label>
          <select id="grade" value={grade} onChange={handleGradeChange}>
            <option value="">All</option>
            {gradeList.map((grade, index) => (
              <option key={index} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>

        <button className="view-btn" onClick={handleViewClick}>View</button>
      </div>

      {errorMessage && <div className="error">
          {errorMessage}
        </div>}

      {!errorMessage && (
        <form>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Grade</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((member, index) => (
                <tr key={member.id}>
                  <td>{member._id}</td>
                  <td>{member.first_name} {member.last_name}</td>

                  <td>{member.grade}</td>
                  <td>{member.gender}</td>
                  <td className="action-buttons">
                    <button className="edit-btn">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="prev-btn">
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="next-btn">
              Next
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentList;
