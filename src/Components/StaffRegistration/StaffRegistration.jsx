import React, { useState } from 'react';
import axios from 'axios';
import './StaffRegistration.css';

const initialState = {
  firstName: '',
  lastName: '',
  nic: '',
  dob: '',
  gender: '',
  mobileNumber: '',
  whatsappNumber: '',
  address: '',
  email: '',
  role: '',
  registeredDate: new Date().toISOString().slice(0, 10),
  registeredBy: '',
};

const StaffRegistration = () => {
  const [staff, setStaff] = useState(initialState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setStaff((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      role: staff.role,
      first_name: staff.firstName,
      last_name: staff.lastName,
      nic_no: staff.nic,
      date_of_birth: staff.dob,
      gender: staff.gender,
      personal_number: staff.mobileNumber,
      whatsapp_number: staff.whatsappNumber,
      address: staff.address,
      email: staff.email,
      registered_date: staff.registeredDate,
      registered_by: staff.registeredBy,
    };

    try {
      const response = await axios.post('http://localhost:5000/user/add', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      alert('User Added Successfully');
      setStaff(initialState);
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Error adding user');
    }
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
            <label htmlFor="gender">Gender</label>
            <select id="gender" required value={staff.gender} onChange={handleChange}>
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" required value={staff.dob} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input type="tel" id="mobileNumber" required value={staff.mobileNumber} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="whatsappNumber">WhatsApp Number</label>
            <input type="tel" id="whatsappNumber" value={staff.whatsappNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="nic">NIC</label>
            <input type="text" id="nic" required value={staff.nic} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="address">Home Address</label>
            <textarea id="address" required value={staff.address} onChange={handleChange}></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required value={staff.email} onChange={handleChange} />
          </div>
        </div>
  
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select id="role" required value={staff.role} onChange={handleChange}>
              <option value="" disabled>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Cashier">Cashier</option>
              <option value="Accountant">Accountant</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="registeredBy">Registered By</label>
            <input type="text" id="registeredBy" required value={staff.registeredBy} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="registeredDate">Registered Date</label>
            <input type="date" id="registeredDate" required value={staff.registeredDate} onChange={handleChange} />
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
