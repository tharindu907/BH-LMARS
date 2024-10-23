import React, { useState } from 'react';
import searchIcon from '../Assets/serchicon.png'; // Adjust the path if necessary
import axios from 'axios';
import './StudentDetails.css';

const defaultStudent = {
  studentid: '',
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
  registeredDate: '',
  registeredBy: '',
  qrcode: ''
};

const StudentDetails = () => {
  const [student, setStudent] = useState(defaultStudent);
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSearch = async () => {
    try {
      if(searchId) {
        const response = await axios.get(`http://localhost:5000/student/get/studentdetails/${searchId}`);
        if (!response.data) {
          setErrorMessage('Invalid StudentID');
          setStudent(defaultStudent);
  
        } else {
          setErrorMessage('');
          setStudent({
            studentid: response.data._id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            mobileNumber: response.data.personal_number,
            dob: response.data.date_of_birth.slice(0, 10),
            gender: response.data.gender,
            whatsappNumber: response.data.whatsapp_number,
            address: response.data.address,
            school: response.data.school,
            grade: response.data.grade,
            guardianName: response.data.guardian_name,
            guardianContactNumber: response.data.guardian_number,
            registeredDate: response.data.registered_date.slice(0, 10),
            registeredBy: response.data.registered_by,
            qrcode: response.data.qr_url
          });
        }
      } else {
        setErrorMessage("Enter a StudentID");
      }

    } catch (error) {
      console.error('Error fetching student data:', error);
      setErrorMessage('Server error occurred');  // Handle server errors
      setStudent(defaultStudent);  // Reset student data
    }
  };

  return (
    <div className="student-details">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Student..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)} 
        />
        <button type="button" onClick={handleSearch}>
          <img src={searchIcon} alt="Search" />
        </button>
      </div>

      {errorMessage && <div className="error">
          {errorMessage}
        </div>}

      {!errorMessage && (

        <form>
          <div className="form-row">
            <div className="input-group">
              <label>Student ID</label>
              <div>{student.studentid}</div>
            </div>
            <div className="input-group">
              <label>First Name</label>
              <div>{student.firstName}</div>
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <div>{student.lastName}</div>
            </div>
            
            
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Gender</label>
              <div>{student.gender}</div>
            </div>
            <div className="input-group">
              <label>Mobile Number</label>
              <div>{student.mobileNumber}</div>
            </div>
            <div className="input-group">
              <label>WhatsApp Number</label>
              <div>{student.whatsappNumber}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Date of Birth</label>
              <div>{student.dob}</div>
            </div>
            
            <div className="input-group">
              <label>School</label>
              <div>{student.school}</div>
            </div>
            <div className="input-group">
              <label>Grade</label>
              <div>{student.grade}</div>
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Home Address</label>
              <div>{student.address}</div>
            </div>
            <div className="input-group">
              <label>Guardian Name</label>
              <div>{student.guardianName}</div>
            </div>
            <div className="input-group">
              <label>Guardian Contact Number</label>
              <div>{student.guardianContactNumber}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Registered By</label>
              <div>{student.registeredBy}</div>
            </div>
            <div className="input-group">
              <label>Registered Date</label>
              <div>{student.registeredDate}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group wide">
              {student.qrcode ? (
                <img src={student.qrcode} alt="QR Code" className="qr-code-image" />
              ) : (
                <div>No QR Code Available</div>
              )}
            </div>
          </div>

        </form>
      )}
    </div>
  );
};

export default StudentDetails;