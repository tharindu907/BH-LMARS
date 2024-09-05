import React, { useState } from 'react';
import './TeacherDetails.css';

const TeacherDetails = () => {
  const [teacher, setTeacher] = useState({
    firstName: 'Dion',
    lastName: 'Ariyawansa',
    nic: '123456789V',
    dob: '1990-05-10',
    gender: 'Male',
    mobileNumber: '0771234567',
    whatsappNumber: '0779876543',
    address: '123, ABC Street, Colombo',
    registeredDate: '2023-01-01',
    updatedBy: 'Admin',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTeacher((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saved data:', teacher);
    alert('Changes saved!');
  };

  return (
    <div className="teacher-details-form">
      <h1>Teacher Details</h1>
      <form onSubmit={handleSave}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={teacher.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={teacher.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={teacher.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={teacher.dob}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              value={teacher.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="whatsappNumber">WhatsApp Number</label>
            <input
              type="tel"
              id="whatsappNumber"
              value={teacher.whatsappNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="nic">NIC</label>
            <input
              type="text"
              id="nic"
              value={teacher.nic}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Home Address</label>
            <textarea
              id="address"
              value={teacher.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="registeredDate">Registered Date</label>
            <input
              type="date"
              id="registeredDate"
              value={teacher.registeredDate}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="updatedBy">Updated By</label>
            <input
              type="text"
              id="updatedBy"
              value={teacher.updatedBy}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default TeacherDetails;
