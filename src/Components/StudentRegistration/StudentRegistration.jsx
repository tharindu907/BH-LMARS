import React, { useState, useEffect } from 'react';
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
  registeredBy: ''
};

const StudentRegistration = () => {
  const [student, setStudent] = useState(initialState);
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
    setStudent(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      first_name: student.firstName,
      last_name: student.lastName,
      date_of_birth: student.dob,
      gender: student.gender,
      personal_number: student.mobileNumber,
      whatsapp_number: student.whatsappNumber,
      address: student.address,
      school: student.school,
      grade: student.grade,
      guardian_name: student.guardianName,
      guardian_number: student.guardianContactNumber,
      registered_date: student.registeredDate,
      registered_by: student.registeredBy,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/student/add', data, {
        headers: {
          'Content-Type': 'application/json',
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
            <label htmlFor="gender">Gender</label>
            <select id="gender" required value={student.gender} onChange={handleChange}>
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" required value={student.dob} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input type="tel" id="mobileNumber" required value={student.mobileNumber} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="whatsappNumber">WhatsApp Number</label>
            <input type="tel" id="whatsappNumber" value={student.whatsappNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group ">
            <label htmlFor="address">Home Address</label>
            <textarea id="address" required value={student.address} onChange={handleChange}></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="school">School</label>
            <textarea id="school" value={student.school} onChange={handleChange}></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="grade">Grade</label>
            <input type="text" id="grade" required value={student.grade} onChange={handleChange} />
          </div>
        </div>
  
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="guardianName">Guardian Name</label>
            <input type="text" id="guardianName" required value={student.guardianName} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="guardianContactNumber">Guardian Contact No.</label>
            <input type="tel" id="guardianContactNumber" required value={student.guardianContactNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="registeredBy">Registered By</label>
            <select id="registeredBy" required value={student.registeredBy} onChange={handleChange}>
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
            <input type="date" id="registeredDate" required value={student.registeredDate} onChange={handleChange} />
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
