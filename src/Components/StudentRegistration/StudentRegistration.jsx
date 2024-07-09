// src/Components/StudentRegistration.jsx
import React from 'react';
import './StudentRegistration.css';

const StudentRegistration = () => {
  return (
    <div className="student-form">
      <form>
        <div className="form-section">
          <h1>Add New Student</h1>
          <input type="text" id="firstName" placeholder="First Name" required />
          <input type="text" id="lastName" placeholder="Last Name" required />
          <input type="date" id="dob" placeholder="Date of Birth" required />
          <select id="gender" required>
            <option value="" disabled selected>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input type="tel" id="mobileNumber" placeholder="Mobile Number" required />
          <input type="tel" id="homeTelephoneNumber" placeholder="Home Telephone Number" />
          <input type="tel" id="whatsappNumber" placeholder="WhatsApp Number" />
          <textarea id="address" placeholder="Home Address" required></textarea>
          <textarea id="schoolAddress" placeholder="School Address"></textarea>
          <input type="file" id="photoUpload" accept="image/*" required />
          <input type="date" id="registeredDate" placeholder="Registered Date" required />
          <input type="text" id="registeredBy" placeholder="Registered By" required />
        </div>
        <hr />
        <div className="form-section">
          <input type="text" id="guardianName" placeholder="Guardian Name" required />
          <textarea id="guardianAddress" placeholder="Guardian Address" required></textarea>
          <input type="tel" id="guardianContactNumber" placeholder="Guardian Contact Number" required />
        </div>
        <div className="form-buttons">
          <button type="reset">Reset</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistration;
