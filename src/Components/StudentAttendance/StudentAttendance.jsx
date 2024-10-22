import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import serchIcon from '../Assets/serchicon.png';
import axios from 'axios';
import './StudentAttendance.css';

const defaultStudent = {
  studentid: '',
  firstName: '',
  lastName: ''
};

const StudentAttendance = () => {
  const [studentAttendance, setstudentAttendance] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [student, setStudent] = useState(defaultStudent);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [teacher, setTeacher] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [medium, setMedium] = useState('');

  useEffect(() => {
    const fetchSubjectsGradesTeachers = async () => {
      try {
        const responseSubjects = await axios.get('http://localhost:5000/class/get/subjectnamesforallclasses');
        const responseGrades = await axios.get('http://localhost:5000/class/get/gradesforallclasses');
        const responseTeachers = await axios.get('http://localhost:5000/user/get/teachernames');

        setSubjects(responseSubjects.data);
        setGrades(responseGrades.data);
        setTeachers(responseTeachers.data);

      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjectsGradesTeachers();
  }, []);

  const handleSearch = async () => {
    try {
      if (searchId){
        const response = await axios.get(`http://localhost:5000/student/get/studentdetails/${searchId}`);
        if (response.data === null) {
          setErrorMessage('Invalid StudentID');
          setStudent(defaultStudent);

        } else {
          setErrorMessage('');
          setStudent({
            studentid: response.data._id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
          });
        }
      } else {
        setErrorMessage('Enter the StudentID');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      setErrorMessage('Server error occurred');
      setStudent(defaultStudent);
    }
  };

  const handleView = async() => {
    try { // check whether the subject, grade, medium, and teacher combination has a class
      if (searchId) {
        setErrorMessage(null);
        const responseForClassID = await axios.post('http://localhost:5000/class/get/classIdbyDetails', {
          subject,
          grade,
          medium,
          teacher
        });
  
        const classId = responseForClassID.data;
  
        if (!classId) {
          setErrorMessage("Class does not exist");
        } else {
          try { // check the student is registered to the class
            const responseForIsStudentInClass =  await axios.post('http://localhost:5000/studentsInClass/get/isStudentEnrolledToClass', {
              classId,
              year,
              student
            });
  
            const isStudentInClass = responseForIsStudentInClass.data.isStudentEnrolled;
  
            if (!isStudentInClass){
              setErrorMessage("Student is not registered to the class");
            } else {
              try {
                const responseForStudentAttendance = await axios.post('http://localhost:5000/classAttendance/get/studentAttendance', {
                  student,
                  classId,
                  year,
                  month
                })
  
                setstudentAttendance(responseForStudentAttendance.data);
              } catch (error) {
                console.error('Error fetching student attendance:', error);
              }
            }
          } catch (error) {
            console.error('Error checking whether student is registered to the class:', error);
          }
        }
      } else {
        setErrorMessage('Enter the StudentID');
      }      
    } catch (error) {
      console.error('Error fetching class ID:', error);
    }
  }

  return (
    <div className="student-attendance">
      
      <div className="window">
        <div className="attendance-search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search Student"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <img src={serchIcon} alt="Search" />
          </button>
        </div>
      </div>

      {/* Student Details Bar Window */}
      <div className="window">
        <div className="student-details-bar">
          <span className="student-info">Student ID: {student.studentid} | Student name: {student.firstName} {student.lastName}</span>
          <Link to="/admin/student/details" className="view-details-button">
            More Details
          </Link>
        </div>
      </div>

      {/* Filters Window */}
      <div className="window">
        <div className="filters">

          <div className="filter-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="" disabled>
                Select Subject
              </option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}      
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="medium">Medium</label>
            <select
              id="medium"
              value={medium} 
              onChange={(e) => setMedium(e.target.value)}
            >
              <option value="" disabled>
                Select Medium
              </option>
              {["English", "Sinhala"].map((medium, index) => (
                <option key={index} value={medium}>
                  {medium}
                </option>
              ))}      
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="grade">Grade</label>
            <select
              id="grade"
              value={grade} 
              onChange={(e) => setGrade(e.target.value)}
            >
              <option value="" disabled>
                Select Grade
              </option>
              {grades.map((grade, index) => (
                <option key={index} value={grade}>
                  {grade}
                </option>
              ))}      
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="teacher">Teacher</label>
            <select
              id="teacher"
              value={teacher} 
              onChange={(e) => setTeacher(e.target.value)}
            >
              <option value="" disabled>
                Select Teacher
              </option>
              {teachers.map((teacher, index) => (
                <option key={index} value={teacher}>
                  {teacher}
                </option>
              ))}      
            </select>
          </div>
    
          <div className="filter-group">
            <label htmlFor="month">Month</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="" disabled>
                Select Month
              </option>
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="" disabled>
                Select Year
              </option>
              {["2023", "2024"].map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleView}>View</button>
        </div>
      </div>

      {errorMessage && <div className="error">
          {errorMessage}
        </div>}

      {!errorMessage && (
        <form>
          {/* Attendance Table Window */}
        <div className="window">
          <div className="attendance-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Attended Time</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {studentAttendance.length > 0 ? (
                  studentAttendance.map((attendance, index) => (
                    <tr key={index}>
                      <td>{attendance.date}</td>
                      <td>{attendance.timeAttended ? attendance.timeAttended : 'N/A'}</td>
                      <td>{attendance.present ? 'Present' : 'Absent'}</td>
                      <td>
                        <button className="change-attendance-button">Change Attendance</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No attendance records available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons Window */}
        <div className="button-window">
          <div className="action-buttons">
            <Link to="/admin/student/payments">
              <button>View Payments</button>
            </Link>
            <button>Save Changes</button>
          </div>
        </div>
        </form>
      )}
    </div>
  );
};

export default StudentAttendance;
