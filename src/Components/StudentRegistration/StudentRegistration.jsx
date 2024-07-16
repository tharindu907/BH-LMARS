import React, { useState } from 'react';
import axios from 'axios';
import './StudentRegistration.css';

const initialState = {
  firstName: '',
  lastName: '',
  mobileNumber: '',
  dob: '',
  gender: '',
  whatsappNumber: '',
  address: '',
  school: '',
  grade: '',
  guardianName: '',
  guardianContactNumber: '',
  registeredDate: new Date().toISOString().slice(0, 10),
  registeredBy: '',
  studentImage: null, // Added field for student image
};

const StudentRegistration = () => {
  const [student, setStudent] = useState(initialState);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'studentImage') {
      setStudent((prevState) => ({
        ...prevState,
        studentImage: files[0],
      }));
    } else {
      setStudent((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData();
    formData.append('first_name', student.firstName);
    formData.append('last_name', student.lastName);
    formData.append('date_of_birth', student.dob);
    formData.append('gender', student.gender);
    formData.append('personal_number', student.mobileNumber);
    formData.append('whatsapp_number', student.whatsappNumber);
    formData.append('address', student.address);
    formData.append('school', student.school);
    formData.append('grade', student.grade);
    formData.append('guardian_name', student.guardianName);
    formData.append('guardian_number', student.guardianContactNumber);
    formData.append('registered_date', student.registeredDate);
    formData.append('registered_by', student.registeredBy);
    formData.append('student_image', student.studentImage);

    try {
      const response = await axios.post('http://localhost:5000/student/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Student Added Successfully');
      setStudent(initialState);
    } catch (error) {
      console.error('Failed to add student:', error);
      alert('Error adding student');
    }
  };

  const handleReset = () => {
    setStudent(initialState);
  };

  return (
    <div className="student-form">
      <h1>Add New Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" required value={student.firstName} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" required value={student.lastName} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="mobileNumber">Mobile No.</label>
            <input type="tel" id="mobileNumber" required value={student.mobileNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" required value={student.dob} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" required value={student.gender} onChange={handleChange}>
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="input-group"></div>
        </div>

        <div className="form-row">
          <div className="input-group wide">
            <label htmlFor="address">Home Address</label>
            <textarea id="address" required value={student.address} onChange={handleChange}></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="whatsappNumber">WhatsApp No.</label>
            <input type="tel" id="whatsappNumber" value={student.whatsappNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="school">School</label>
            <textarea id="school" value={student.school} onChange={handleChange}></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="grade">Grade</label>
            <input type="text" id="grade" required value={student.grade} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="registeredDate">Registered Date</label>
            <input type="date" id="registeredDate" required value={student.registeredDate} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="studentImage">Student Image</label>
            <input type="file" id="studentImage" accept="image/*" onChange={handleChange} />
          </div>
          <div className="input-group"></div>
          <div className="input-group">
            <label htmlFor="registeredBy">Registered By</label>
            <input type="text" id="registeredBy" required value={student.registeredBy} onChange={handleChange} />
          </div>
        </div>

        <hr className="divider" />

        <div className="form-row">
          <div className="input-group wide">
            <label htmlFor="guardianName">Guardian Name</label>
            <input type="text" id="guardianName" required value={student.guardianName} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="guardianContactNumber">Guardian Contact No.</label>
            <input type="tel" id="guardianContactNumber" required value={student.guardianContactNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={handleReset}>Reset</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistration;
