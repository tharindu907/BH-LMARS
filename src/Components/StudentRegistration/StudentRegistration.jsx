import React from 'react';
import './StudentRegistration.css'; // Import the CSS file

const StudentRegistration = () => {
  return (
    <div className="student-registration">
      <h2>Student Registration</h2>
      <form>
        <div className="form-section">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Mobile No</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Home Telephone No</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>WhatsApp No</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Home Address</label>
            <textarea></textarea>
          </div>
          <div className="form-group">
            <label>School</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Add Photo</label>
            <input type="file" />
          </div>
          <div className="form-group">
            <label>Registered Date</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Registered By</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-section">
          <h3>Guardian Information</h3>
          <div className="form-group">
            <label>Guardian Name</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Guardian Address</label>
            <textarea></textarea>
          </div>
          <div className="form-group">
            <label>Guardian Contact No</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistration;
