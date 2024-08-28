import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentDetails.css';

const StudentDetails = ({ studentId }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/student/${studentId}`);
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

  return (
    <div className="student-details">
      <h1>Student Number: {student.studentNumber}</h1>
      <div className="form-row">
        <div className="input-group">
          <label>First Name</label>
          <div className="details-field">{student.firstName}</div>
        </div>
        <div className="input-group">
          <label>Last Name</label>
          <div className="details-field">{student.lastName}</div>
        </div>
        <div className="input-group">
          <label>Mobile No.</label>
          <div className="details-field">{student.mobileNumber}</div>
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label>Date of Birth</label>
          <div className="details-field">{student.dob}</div>
        </div>
        <div className="input-group">
          <label>Gender</label>
          <div className="details-field">{student.gender}</div>
        </div>
      </div>

      <div className="form-row">
        <div className="input-group wide">
          <label>Home Address</label>
          <div className="details-field">{student.address}</div>
        </div>
        <div className="input-group">
          <label>WhatsApp No.</label>
          <div className="details-field">{student.whatsappNumber}</div>
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label>School</label>
          <div className="details-field">{student.school}</div>
        </div>
        <div className="input-group">
          <label>Grade</label>
          <div className="details-field">{student.grade}</div>
        </div>
        <div className="input-group">
          <label>Registered Date</label>
          <div className="details-field">{student.registeredDate}</div>
        </div>
      </div>

      <div className="form-row">
        <div className="input-group wide">
          <label>Guardian Name</label>
          <div className="details-field">{student.guardianName}</div>
        </div>
        <div className="input-group">
          <label>Guardian Contact No.</label>
          <div className="details-field">{student.guardianContactNumber}</div>
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label>Registered By</label>
          <div className="details-field">{student.registeredBy}</div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
