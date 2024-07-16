import React, { useState } from 'react';
import './TeacherRegistration.css';

const initialState = {
  firstName: '',
  lastName: '',
  mobileNumber: '',
  dob: '',
  gender: '',
  whatsappNumber: '',
  address: '',
  email: '',
  registeredDate: new Date().toISOString().slice(0, 10),
  registeredBy: '',
  teacherImage: null, // Added field for teacher image
};

const TeacherRegistration = () => {
  const [teacher, setTeacher] = useState(initialState);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'teacherImage') {
      setTeacher((prevState) => ({
        ...prevState,
        teacherImage: files[0],
      }));
    } else {
      setTeacher((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', teacher);
    alert('Form submitted successfully');
    setTeacher(initialState);
  };

  const handleReset = () => {
    setTeacher(initialState);
  };

  return (
    <div className="teacher-form">
      <h1>Add New Teacher</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" required value={teacher.firstName} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" required value={teacher.lastName} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="mobileNumber">Mobile No.</label>
            <input type="tel" id="mobileNumber" required value={teacher.mobileNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" required value={teacher.dob} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" required value={teacher.gender} onChange={handleChange}>
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
            <textarea id="address" required value={teacher.address} onChange={handleChange}></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="whatsappNumber">WhatsApp No.</label>
            <input type="tel" id="whatsappNumber" value={teacher.whatsappNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group wide">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" required value={teacher.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="registeredDate">Registered Date</label>
            <input type="date" id="registeredDate" required value={teacher.registeredDate} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="teachertImage">Teacher Image</label>
            <input type="file" id="teacherImage" accept="image/*" onChange={handleChange} />
          </div>
          <div className="input-group"></div>
          <div className="input-group">
            <label htmlFor="registeredBy">Registered By</label>
            <input type="text" id="registeredBy" required value={teacher.registeredBy} onChange={handleChange} />
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

export default TeacherRegistration;
