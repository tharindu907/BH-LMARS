import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeacherRegistration.css';

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
  registeredDate: new Date().toISOString().slice(0, 10),
  registeredBy: '',
};

const TeacherRegistration = () => {
  const [teacher, setTeacher] = useState(initialState);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/get/admin');
        setAdmins(response.data);
      } catch (error) {
        console.error('Failed to fetch admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTeacher((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      role: "Teacher",
      first_name: teacher.firstName,
      last_name: teacher.lastName,
      nic_no: teacher.nic,
      date_of_birth: teacher.dob,
      gender: teacher.gender,
      personal_number: teacher.mobileNumber,
      whatsapp_number: teacher.whatsappNumber,
      address: teacher.address,
      email: teacher.email,
      registered_date: teacher.registeredDate,
      registered_by: teacher.registeredBy,
    };

    try {
      const response = await axios.post('http://localhost:5000/user/add', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      alert('User Added Successfully');
      setTeacher(initialState);
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Error adding user');
    }
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
            <label htmlFor="gender">Gender</label>
            <select id="gender" required value={teacher.gender} onChange={handleChange}>
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" required value={teacher.dob} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input type="tel" id="mobileNumber" required value={teacher.mobileNumber} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="whatsappNumber">WhatsApp Number</label>
            <input type="tel" id="whatsappNumber" value={teacher.whatsappNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="nic">NIC</label>
            <input type="text" id="nic" required value={teacher.nic} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="address">Home Address</label>
            <textarea id="address" required value={teacher.address} onChange={handleChange}></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required value={teacher.email} onChange={handleChange} />
          </div>
        </div>
  
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="registeredBy">Registered By</label>
            <select id="registeredBy" required value={teacher.registeredBy} onChange={handleChange}>
              <option value="" disabled>Select Admin</option>
              {admins.map(admin => (
                <option key={admin._id} value={admin._id}>
                  {admin.first_name + " " + admin.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="registeredDate">Registered Date</label>
            <input type="date" id="registeredDate" required value={teacher.registeredDate} onChange={handleChange} />
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
