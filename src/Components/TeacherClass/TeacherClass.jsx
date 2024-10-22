import React, { useState } from 'react';
import serchIcon from '../Assets/serchicon.png';
import axios from 'axios';
import './TeacherClass.css';

const defaultTeacher = {
  teacherid: '',
  firstname: '',
  lastname: ''
}

const TeacherClass = () => {
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [teacher, setTeacher] = useState(defaultTeacher);
  const [classList, setClassList] = useState([]);

  const handleSearch = async () => {
    try {
      if (searchId) {
        const responseforsearchid = await axios.get(`http://localhost:5000/user/get/teacherdetails/${searchId}`);
        if (responseforsearchid.data === null) {
          setErrorMessage('Invalid TeacherID');
          setTeacher(defaultTeacher);
        } else {
          setErrorMessage('');
          setTeacher({
            teacherid: responseforsearchid.data._id,
            firstname: responseforsearchid.data.first_name,
            lastname: responseforsearchid.data.last_name,
          })

          const responseforclasslist = await axios.get(`http://localhost:5000/class/get/allclassesforteacher/${searchId}`);
          setClassList(responseforclasslist.data)

        }
      } else {
        setErrorMessage('Enter the TeacherID');
      }


    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Server error occurred');
      setTeacher(defaultTeacher);
    }
  };


  return (
    <div className="teacher-class-class-list-container">

      <div className="window">
        <div className="teacher-search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search Teacher"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <img src={serchIcon} alt="Search" />
          </button>
        </div>
      </div>

      {errorMessage && <div className="error">
          {errorMessage}
        </div>}
      
      {!errorMessage && (
        <form>
          <div className="teacher-class-details-bar">
            <span className="teacher-class-details">TeacherID: {teacher.teacherid}</span>
            <span className="teacher-class-details">Teacher: {teacher.firstname} {teacher.lastname}</span>
            <button className="teacher-class-details-btn" onClick={() => console.log('View Details')}>
              More Details
            </button>
          </div>

          <table className="teacher-class-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Medium</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classList.length > 0 ? (
                classList.map((classItem, index) => (
                  <tr key={classItem.id}>
                    <td>{classItem.subject}</td>
                    <td>{classItem.medium}</td>
                    <td>{classItem.grade}</td>
                    <td className="teacher-class-action-buttons">
                      <button className="teacher-class-remove-btn" onClick={() => console.log(`Remove Class ${classItem.id}`)}>
                        Remove Class
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No classes found for the Teacher</td>
                </tr>
              )}
            </tbody>
          </table>
        </form>
      )}
    </div>
  );
};

export default TeacherClass;