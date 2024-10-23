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
  const [teacher, setTeacher] = useState(defaultTeacher);
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editEnabled, setEditEnabled] = useState(false);

  const handleSearch = async () => {
    try {
      if (searchId) {
        const response = await axios.get(`http://localhost:5000/user/get/userdetails/${searchId}`);
        if (!response.data) {
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
      } else {
        setErrorMessage('Enter a TeacherID');
      }
      
    } catch (error) {
      console.error('Error fetching teacher data:', error);
      setErrorMessage('Server error occurred');
      setTeacher(defaultTeacher);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTeacher((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const update = await axios.put(`http://localhost:5000/user/update/userdetails/${teacher.teacherid}`, {
        firstname: teacher.firstname,
        lastname: teacher.lastname,
        nic: teacher.nic,
        dob: teacher.dob,
        gender: teacher.gender,
        email: teacher.email,
        mobilenumber: teacher.mobilenumber,
        whatsappnumber: teacher.whatsappnumber,
        address: teacher.address
      });

      if (update.status === 200) {
        alert('Teacher Updated Successfully');
        setEditEnabled(false);
        handleSearch();
      } else {
        setErrorMessage('Failed to update class');
      }
    } catch (error) {
      console.error('Error updating class:', error);
      setErrorMessage('Server error occurred');
    }
  };

  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditEnabled(!editEnabled);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditEnabled(false);
    handleSearch();
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

      {!errorMessage && (
        <form>
          <div className="form-row">

            <div className="input-group">
              <label>Teacher ID</label>
              <div>{teacher.teacherid}</div>
            </div>

            <div className="input-group">
              <label>First Name</label>
              {editEnabled ? (
                <input
                  type="text"
                  id="firstname"
                  value={teacher.firstname}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="firstname"
                  value={teacher.firstname}
                  readOnly
                />
              )}
            </div>

            <div className="input-group">
              <label>Last Name</label>
              {editEnabled ? (
                <input
                  type="text"
                  id="lastname"
                  value={teacher.lastname}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="lastname"
                  value={teacher.lastname}
                  readOnly
                />
              )}
            </div>
          </div>

          <div className="form-row">

            <div className="input-group">
              <label>NIC</label>
              {editEnabled ? (
                <input
                  type="text"
                  id="nic"
                  value={teacher.nic}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="nic"
                  value={teacher.nic}
                  readOnly
                />
              )}
            </div>

            <div className="input-group">
              <label>Date of Birth</label>
              {editEnabled ? (
                <input
                  type="date"
                  id="dob"
                  value={teacher.dob}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="dob"
                  value={teacher.dob}
                  readOnly
                />
              )}
            </div>

            <div className="input-group">
              <label>Gender</label>
              {editEnabled ? (
                <select
                  type="text"
                  id="gender"
                  value={teacher.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <input
                  type="text"
                  id="gender"
                  value={teacher.gender}
                  readOnly
                />
              )}
            </div>

          </div>

          <div className="form-row">

            <div className="input-group">
              <label>Email</label>
              {editEnabled ? (
                <input
                  type="email"
                  id="email"
                  value={teacher.email}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="email"
                  id="email"
                  value={teacher.email}
                  readOnly
                />
              )}
            </div>

            <div className="input-group">
              <label>Mobile Number</label>
              {editEnabled ? (
                <input
                  type="text"
                  id="mobilenumber"
                  value={teacher.mobilenumber}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="mobilenumber"
                  value={teacher.mobilenumber}
                  readOnly
                />
              )}
            </div>

            <div className="input-group">
              <label>WhatsApp Number</label>
              {editEnabled ? (
                <input
                  type="text"
                  id="whatsappnumber"
                  value={teacher.whatsappnumber}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="whatsappnumber"
                  value={teacher.whatsappnumber}
                  readOnly
                />
              )}
            </div>

          </div>

          <div className="form-row">

            <div className="input-group">
              <label>Home Address</label>
              {editEnabled ? (
                <input
                  type="text"
                  id="address"
                  value={teacher.address}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="address"
                  value={teacher.address}
                  readOnly
                />
              )}
            </div>

            <div className="input-group">
              <label>Registered By</label>
              <input
                  type="text"
                  id="registeredBy"
                  value={teacher.registeredBy}
                  readOnly
              />
            </div>

            <div className="input-group">
              <label>Registered Date</label>
              <input
                  type="text"
                  id="registeredDate"
                  value={teacher.registeredDate}
                  readOnly
              />
            </div>

          </div>

          <div className="form-buttons">
            {editEnabled ? (
              <>
                <button type="submit" className="form-buttons" onClick={handleSubmit}>
                  Save
                </button>
                <button type="button" className="form-buttons" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button type="button" className="form-buttons" onClick={toggleEditMode}>
                Edit
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default TeacherDetails;
