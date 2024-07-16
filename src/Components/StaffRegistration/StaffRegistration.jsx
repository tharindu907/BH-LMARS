import React, { useState } from 'react';
import './StaffRegistration.css';

const initialState = {
  firstName: '',
  lastName: '',
  mobileNumber: '',
  dob: '',
  gender: '',
  whatsappNumber: '',
  address: '',
  workingRole: '', // Changed from 'email' to 'workingRole'
  registeredDate: new Date().toISOString().slice(0, 10),
  registeredBy: '',
  staffImage: null, // Added field for staff image
};

const StaffRegistration = () => {
  const [staff, setStaff] = useState(initialState);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'staffImage') {
      setStaff((prevState) => ({
        ...prevState,
        staffImage: files[0],
      }));
    } else {
      setStaff((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', staff);
    alert('Form submitted successfully');
    setStaff(initialState);
  };

  const handleReset = () => {
    setStaff(initialState);
  };

  return (
    <div className="staff-form">
      <h1>Add New Staff</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" required value={staff.firstName} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" required value={staff.lastName} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="mobileNumber">Mobile No.</label>
            <input type="tel" id="mobileNumber" required value={staff.mobileNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" required value={staff.dob} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" required value={staff.gender} onChange={handleChange}>
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
            <textarea id="address" required value={staff.address} onChange={handleChange}></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="whatsappNumber">WhatsApp No.</label>
            <input type="tel" id="whatsappNumber" value={staff.whatsappNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group wide">
            <label htmlFor="workingRole">Working Role</label>
            <input type="text" id="workingRole" required value={staff.workingRole} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="registeredDate">Registered Date</label>
            <input type="date" id="registeredDate" required value={staff.registeredDate} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="staffImage">Staff Image</label>
            <input type="file" id="staffImage" accept="image/*" onChange={handleChange} />
          </div>
          <div className="input-group"></div>
          <div className="input-group">
            <label htmlFor="registeredBy">Registered By</label>
            <input type="text" id="registeredBy" required value={staff.registeredBy} onChange={handleChange} />
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

export default StaffRegistration;
