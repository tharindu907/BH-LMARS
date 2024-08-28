import React, { useState } from 'react';
import searchIcon from '../Assets/serchicon.png'; // Adjust the path if necessary
/*import axios from 'axios';*/
import './StudentDetails.css';

const defaultStudent = {
  firstName: 'John',
  lastName: 'Doe',
  mobileNumber: '123-456-7890',
  dob: '2005-04-12',
  gender: 'Male',
  whatsappNumber: '123-456-7890',
  address: '123 Main St, Springfield',
  school: 'Springfield High',
  grade: '10',
  guardianName: 'Jane Doe',
  guardianContactNumber: '987-654-3210',
  registeredDate: '2023-09-01',
  registeredBy: 'Admin',
  studentImage: null, // Assume no image for the default
};

/*
const StudentDetails = ({ studentId }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/student/${studentId}`); //endpoint for fetch data
        setStudent(response.data);
      } catch (error) {
        console.error('Failed to fetch student details:', error);
        alert('Error fetching student details');
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  if (!student) {
    return <div>Loading...</div>;
  }
*/


const StudentDetails = () => {
  const [student] = useState(defaultStudent);

  return (
    <div className="student-details">
      <div className="search-bar">
        <input type="text" placeholder="Search Student..." />
        <button type="submit">
          <img src={searchIcon} alt="Search" />
        </button>
      </div>
      <form>
        <div className="form-row">
          <div className="input-group">
            <label>First Name</label>
            <div>{student.firstName}</div>
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <div>{student.lastName}</div>
          </div>
          <div className="input-group">
            <label>Mobile No.</label>
            <div>{student.mobileNumber}</div>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Date of Birth</label>
            <div>{student.dob}</div>
          </div>
          <div className="input-group">
            <label>Gender</label>
            <div>{student.gender}</div>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group wide">
            <label>Home Address</label>
            <div>{student.address}</div>
          </div>
          <div className="input-group">
            <label>WhatsApp No.</label>
            <div>{student.whatsappNumber}</div>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>School</label>
            <div>{student.school}</div>
          </div>
          <div className="input-group">
            <label>Grade</label>
            <div>{student.grade}</div>
          </div>
          <div className="input-group">
            <label>Registered Date</label>
            <div>{student.registeredDate}</div>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group wide">
            <label>Guardian Name</label>
            <div>{student.guardianName}</div>
          </div>
          <div className="input-group">
            <label>Guardian Contact No.</label>
            <div>{student.guardianContactNumber}</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentDetails;






