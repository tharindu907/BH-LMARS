import React, { useState } from 'react';
import './TeacherClass.css';

const TeacherClass = () => {
  // Default data for three teachers
  const teachersData = {
    'Teacher A': [
      { id: '101', subject: 'Mathematics', medium: 'English', grade: 'Grade 6', income: 'Rs 200' },
      { id: '102', subject: 'Science', medium: 'Sinhala', grade: 'Grade 7', income: 'Rs 150' },
      { id: '103', subject: 'Art', medium: 'English', grade: 'Grade 8', income: 'Rs 100' },
    ],
    'Teacher B': [
      { id: '104', subject: 'History', medium: 'Tamil', grade: 'Grade 9', income: 'Rs 180' },
      { id: '105', subject: 'English', medium: 'English', grade: 'Grade 10', income: 'Rs 250' },
    ],
    'Teacher C': [
      { id: '106', subject: 'Science', medium: 'Sinhala', grade: 'Grade 6', income: 'Rs 210' },
      { id: '107', subject: 'Mathematics', medium: 'English', grade: 'Grade 7', income: 'Rs 220' },
    ],
  };

  // State to hold selected filters
  const [selectedTeacher, setSelectedTeacher] = useState('Teacher A');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedMedium, setSelectedMedium] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [filteredClasses, setFilteredClasses] = useState(teachersData['Teacher A']);

  // State to hold teacher details
  const [teacherDetails, setTeacherDetails] = useState({ name: 'Teacher A', id: '101' });

  const handleTeacherChange = (e) => {
    const teacher = e.target.value;
    setSelectedTeacher(teacher);
    setFilteredClasses(teachersData[teacher]);
    setTeacherDetails({
      name: teacher,
      id: teachersData[teacher][0] ? teachersData[teacher][0].id : 'N/A'
    });
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleMediumChange = (e) => {
    setSelectedMedium(e.target.value);
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };

  const handleViewClick = () => {
    let filtered = teachersData[selectedTeacher];

    if (selectedSubject) {
      filtered = filtered.filter((item) => item.subject === selectedSubject);
    }

    if (selectedMedium) {
      filtered = filtered.filter((item) => item.medium === selectedMedium);
    }

    if (selectedGrade) {
      filtered = filtered.filter((item) => item.grade === selectedGrade);
    }

    setFilteredClasses(filtered);
  };

  return (
    <div className="teacher-class-class-list-container">
      <h2 className="teacher-class-table-title">Class List</h2>

      <div className="teacher-class-filter-box">
        <div className="teacher-class-filter-item">
          <label htmlFor="teacher">Teacher</label>
          <select id="teacher" value={selectedTeacher} onChange={handleTeacherChange}>
            <option value="Teacher A">Teacher A</option>
            <option value="Teacher B">Teacher B</option>
            <option value="Teacher C">Teacher C</option>
          </select>
        </div>

        <div className="teacher-class-filter-item">
          <label htmlFor="subject">Subject</label>
          <select id="subject" value={selectedSubject} onChange={handleSubjectChange}>
            <option value="">Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Art">Art</option>
            <option value="History">History</option>
            <option value="English">English</option>
          </select>
        </div>

        <div className="teacher-class-filter-item">
          <label htmlFor="medium">Medium</label>
          <select id="medium" value={selectedMedium} onChange={handleMediumChange}>
            <option value="">Select Medium</option>
            <option value="English">English</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
          </select>
        </div>

        <div className="teacher-class-filter-item">
          <label htmlFor="grade">Grade</label>
          <select id="grade" value={selectedGrade} onChange={handleGradeChange}>
            <option value="">Select Grade</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
          </select>
        </div>

        <button className="teacher-class-view-btn" onClick={handleViewClick}>View</button>
      </div>

      {/* Teacher Details Bar */}
      <div className="teacher-class-details-bar">
        <span className="teacher-class-details">Teacher: {teacherDetails.name}</span>
        <span className="teacher-class-details">Teacher ID: {teacherDetails.id}</span>
        <button className="teacher-class-details-btn" onClick={() => console.log('View Details')}>
          View Details
        </button>
      </div>

      <table className="teacher-class-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Subject</th>
            <th>Medium</th>
            <th>Grade</th>
            <th>Total Income</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.length > 0 ? (
            filteredClasses.map((classItem, index) => (
              <tr key={classItem.id}>
                <td>{index + 1}</td>
                <td>{classItem.subject}</td>
                <td>{classItem.medium}</td>
                <td>{classItem.grade}</td>
                <td>{classItem.income}</td>
                <td className="teacher-class-action-buttons">
                  <button className="teacher-class-remove-btn" onClick={() => console.log(`Remove Class ${classItem.id}`)}>
                    Remove Class
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No classes found for the selected filters.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherClass;
