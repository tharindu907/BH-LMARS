import React, { useState, useEffect } from 'react';
import './TeacherList.css';
import axios from 'axios';

const TeacherList = () => {
  const [teacherList, setTeacherList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [name, setName] = useState('');
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
        const responseforteacherlist =  await axios.get('http://localhost:5000/user/get/teacherdetails');
        
        setTeacherList(responseforteacherlist.data);
        setFilteredList(responseforteacherlist.data);

      } catch (error) {
        setErrorMessage('Server Error');
        console.error('Error fetching data:', error);        
      }
    };

    fetchData();
  }, []);

  const handleViewClick = () => {
    const filtered = teacherList.filter((member) =>
      (name === '' || (member.first_name + ' ' + member.last_name).toLowerCase().includes(name.toLowerCase())) 
    );
    setFilteredList(filtered);
    setCurrentPage(1);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
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
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((member, index) => (
                <tr key={member.id}>
                  <td>{member._id}</td>
                  <td>{member.first_name} {member.last_name}</td>
                  <td>{member.username}</td>
                  <td>{member.password}</td>
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

export default TeacherList;
