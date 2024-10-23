import React, { useEffect, useState } from "react";
import "./TimeTable.css";
import axios from 'axios';

const TimeTable = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [grade, setGrade] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [timetableData, setTimetableData] = useState([]);

  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const fetchFilters = async () => {
    try {
      const queryParams = new URLSearchParams({
        selectedDate,
        grade: grade || '',
        subject: subject || '',
        teacher: teacher || ''
      });

      const response = await axios.get(`http://localhost:5000/dailyClassSchedule/get/filterfortimetable/?${queryParams.toString()}`);

      setTimetableData(response.data);

      const subjects = [...new Set(response.data.map(item => item.subject))];
      const grades = [...new Set(response.data.map(item => String(item.grade)))];
      const teachers = [...new Set(response.data.map(item => item.teacher))];

      setSubjects(subjects);
      setGrades(grades);
      setTeachers(teachers);
    } catch (error) {
      console.error("Failed to fetch filters:", error);
    }
  };

  useEffect (() => {
    fetchFilters();
  },[selectedDate,grade,subject,teacher])

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setGrade("");
    setSubject("");
    setTeacher("");
    setShowTable(false); // Hide table when the date changes
  };
  
  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };
  
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  
  const handleTeacherChange = (e) => {
    setTeacher(e.target.value);
  };

  const handleViewClick = async () => {
    // Fetch data when the "View" button is clicked
    if (selectedDate) {
      setShowTable(true); // Show the table after fetching the data
    }
  };

  const renderTableHeaders = () => (
    <>
      <th>Start Time</th>
      <th>End Time</th>
      <th>Subject</th>
      <th>Grade</th>
      <th>Teacher</th>
      <th>Medium</th>
    </>
  );

  const renderTableRows = () => {
    return timetableData.map((item, index) => (
      <tr key={index}>
        <td>{item.startTime}</td>
        <td>{item.endTime}</td>   
        <td>{item.subject}</td>
        <td>{item.grade}</td>     
        <td>{item.teacher}</td>  
        <td>{item.medium}</td>    
      </tr>
    ));
  };

  return (
    <div className="timetable-container">
      <div className="top-section">
        <h2 className="timetable-title">Time Table</h2>
      </div>

      <div className="filter-box">
        <div className="filter-item">
          <div>Date:</div>
          <input 
            type="date" 
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="filter-item">
          <div>Grade:</div>
          <select 
            value={grade} 
            onChange={handleGradeChange}
          >
            <option value="">All</option>
            {grades.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <div>Subject:</div>
          <select 
            value={subject} 
            onChange={handleSubjectChange}
          >
            <option value="">All</option>
            {subjects.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <div>Teacher:</div>
          <select 
            value={teacher} 
            onChange={handleTeacherChange}
          >
            <option value="">All</option>
            {teachers.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <button className="view-btn" onClick={handleViewClick}>
          View
        </button>
      </div>

      {showTable && (
        <div className="overflow-x-auto">
          <table className="table timetable-table">
            <thead>
              <tr>
                {renderTableHeaders()}
              </tr>
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TimeTable;
