import React, { useState } from 'react';
import searchIcon from '../Assets/serchicon.png';
import axios from 'axios';
import './TeacherDetails.css';

const defaultTeacher = {
  teacherid: '',
  firstname: '',
  lastname: '',
  nic: '',
  dob: '',
  gender: '',
  email: '',
  mobilenumber: '',
  whatsappnumber: '',
  address: '',
  registeredDate: '',
  registeredBy: ''
};

const TeacherDetails = () => {
  const [teacher, setTeacher] = useState( defaultTeacher );
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/get/teacherdetails/${searchId}`);
      if (response.data === null) {
        setErrorMessage('Invalid TeacherID');
        setTeacher(defaultTeacher);

      } else {
        setErrorMessage('');
        setTeacher({
          teacherid: response.data._id,
          firstname: response.data.first_name,
          lastname: response.data.last_name,
          mobilenumber: response.data.personal_number,
          dob: response.data.date_of_birth.slice(0, 10),
          gender: response.data.gender,
          whatsappnumber: response.data.whatsapp_number,
          address: response.data.address,
          email: response.data.email,
          nic: response.data.nic_no,
          registeredDate: response.data.registered_date.slice(0, 10),
          registeredBy: response.data.registered_by,
        });
      }
    } catch (error) {
      console.error('Error fetching teacher data:', error);
      setErrorMessage('Server error occurred');  // Handle server errors
      setTeacher(defaultTeacher);  // Reset student data
    }
  };

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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Teacher..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)} 
        />
        <button type="button" onClick={handleSearch}>
          <img src={searchIcon} alt="Search" />
        </button>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSave}>
        <div className="form-row">

          <div className="input-group">
            <label>Teacher ID</label>
            <div>{teacher.teacherid}</div>
          </div>

          <div className="input-group">
            <label>First Name</label>
            <div>{teacher.firstname}</div>
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <div>{teacher.lastname}</div>
          </div>
        </div>

        <div className="form-row">

          <div className="input-group">
            <label>NIC</label>
            <div>{teacher.nic}</div>
          </div>

          <div className="input-group">
            <label>Date of Birth</label>
            <div>{teacher.dob}</div>
          </div>
          
          <div className="input-group">
              <label>Gender</label>
              <div>{teacher.gender}</div>
          </div>

        </div>

        <div className="form-row">

          <div className="input-group">
              <label>Email</label>
              <div>{teacher.email}</div>
          </div>

          <div className="input-group">
              <label>Mobile Number</label>
              <div>{teacher.mobilenumber}</div>
          </div>

          <div className="input-group">
              <label>WhatsApp Number</label>
              <div>{teacher.whatsappnumber}</div>
          </div>

        </div>

        <div className="form-row">

            <div className="input-group">
              <label>Home Address</label>
              <div>{teacher.address}</div>
            </div>

            <div className="input-group">
              <label>Registered By</label>
              <div>{teacher.registeredBy}</div>
            </div>

            <div className="input-group">
              <label>Registered Date</label>
              <div>{teacher.registeredDate}</div>
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