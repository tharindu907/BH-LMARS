import React, { useState } from 'react';
import './StaffDetails.css';
import axios from 'axios';
import searchIcon from '../Assets/serchicon.png';

const defaultStaff = {
  staffid: '',
  firstname: '',
  lastname: '',
  nic: '',
  dob: '',
  role: '',
  gender: '',
  email: '',
  mobilenumber: '',
  whatsappnumber: '',
  address: '',
  registeredDate: '',
  registeredBy: ''
};

const StaffDetails = () => {
  const [staff, setStaff] = useState( defaultStaff );
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editEnabled, setEditEnabled] = useState(false);

  const handleSearch = async () => {
    try {
      if (searchId){
        const response = await axios.get(`http://localhost:5000/user/get/userdetails/${searchId}`);
        if (!response.data) {
          setErrorMessage('Invalid StaffID');
          setStaff(defaultStaff);

        } else {
          setErrorMessage('');
          setStaff({
            staffid: response.data._id,
            firstname: response.data.first_name,
            lastname: response.data.last_name,
            mobilenumber: response.data.personal_number,
            dob: response.data.date_of_birth.slice(0, 10),
            gender: response.data.gender,
            whatsappnumber: response.data.whatsapp_number,
            address: response.data.address,
            email: response.data.email,
            role: response.data.role,
            nic: response.data.nic_no,
            registeredDate: response.data.registered_date.slice(0, 10),
            registeredBy: response.data.registered_by,
          });
        }
      } else {
        setErrorMessage('Enter a StaffID');
      }
      
    } catch (error) {
      console.error('Error fetching staff data:', error);
      setErrorMessage('Server error occurred');
      setStaff(defaultStaff);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setStaff((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const update = await axios.put(`http://localhost:5000/user/update/userdetails/${staff.staffid}`, {
        firstname: staff.firstname,
        lastname: staff.lastname,
        nic: staff.nic,
        dob: staff.dob,
        gender: staff.gender,
        email: staff.email,
        mobilenumber: staff.mobilenumber,
        whatsappnumber: staff.whatsappnumber,
        address: staff.address
      });

      if (update.status === 200) {
        alert('staff Updated Successfully');
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
    <div className="staff-details-form">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search staff..."
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
              <label>Staff ID</label>
              <div>{staff.staffid}</div>
            </div>

            <div className="input-group">
              <label>First Name</label>
              {editEnabled ? (
                <input
                  type="text"
                  id="firstname"
                  value={staff.firstname}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="firstname"
                  value={staff.firstname}
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
                  value={staff.lastname}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="lastname"
                  value={staff.lastname}
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
                  value={staff.nic}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="nic"
                  value={staff.nic}
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
                  value={staff.dob}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="dob"
                  value={staff.dob}
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
                  value={staff.gender}
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
                  value={staff.gender}
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
                  value={staff.email}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="email"
                  id="email"
                  value={staff.email}
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
                  value={staff.mobilenumber}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="mobilenumber"
                  value={staff.mobilenumber}
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
                  value={staff.whatsappnumber}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="whatsappnumber"
                  value={staff.whatsappnumber}
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
                  value={staff.address}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id="address"
                  value={staff.address}
                  readOnly
                />
              )}
            </div>

            <div className="input-group">
              <label>Registered By</label>
              <input
                  type="text"
                  id="registeredBy"
                  value={staff.registeredBy}
                  readOnly
              />
            </div>

            <div className="input-group">
              <label>Registered Date</label>
              <input
                  type="text"
                  id="registeredDate"
                  value={staff.registeredDate}
                  readOnly
              />
            </div>

          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Role</label>
                <input
                  type="text"
                  id="role"
                  value={staff.role}
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

export default StaffDetails;
