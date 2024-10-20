import React, { useState } from 'react';
import './ClassDetails.css';

const initialState = {
  teacherName: '',
  teacherId: 'T1',
  subject: '',
  subjectId: 'S1',
  grade: '',
  totalStudents: '30',
  day: '',
  fee: '',
  registeredDate: new Date().toISOString().slice(0, 10),
  registeredBy: 'Admin',
  updatedBy: 'Admin',
};

const defaultTeachers = [
  { id: 'T1', name: 'Teacher One' },
  { id: 'T2', name: 'Teacher Two' },
];

const defaultSubjects = [
  { id: 'S1', name: 'Math' },
  { id: 'S2', name: 'Science' },
  { id: 'S3', name: 'History' },
  { id: 'S4', name: 'English' },
];

const defaultGrades = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];
const defaultDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ClassDetails = () => {
  const [formData, setFormData] = useState(initialState);
  const [times, setTimes] = useState([{ day: '', from: '', to: '' }]);
  const [teachers] = useState(defaultTeachers);
  const [subjects] = useState(defaultSubjects);
  const [grades] = useState(defaultGrades);
  const [days] = useState(defaultDays);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleTimeChange = (index, e) => {
    const { id, value } = e.target;
    setTimes((prevTimes) => {
      const newTimes = [...prevTimes];
      newTimes[index][id] = value;
      return newTimes;
    });
  };

  const addTimeSlot = () => {
    setTimes([...times, { day: '', from: '', to: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Class Updated Successfully');
  };

  const handleReset = () => {
    setFormData(initialState);
    setTimes([{ day: '', from: '', to: '' }]);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="class-details-form">
      <h1>Class ID: 12345</h1>

      <form onSubmit={handleSubmit}>
        {/* First Row */}
        <div className="class-details-row">
          <div className="class-details-input-details-group">
            <label htmlFor="teacherName">Teacher Name</label>
            {isEditing ? (
              <select
                id="teacherName"
                value={formData.teacherName}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id="teacherName"
                value={formData.teacherName}
                readOnly
              />
            )}
          </div>
          <div className="class-details-input-details-group">
            <label htmlFor="subject">Subject</label>
            {isEditing ? (
              <select
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>{subject.name}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id="subject"
                value={formData.subject}
                readOnly
              />
            )}
          </div>
          <div className="class-details-input-details-group">
            <label htmlFor="grade">Grade</label>
            {isEditing ? (
              <select
                id="grade"
                value={formData.grade}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id="grade"
                value={formData.grade}
                readOnly
              />
            )}
          </div>
        </div>

        {/* Second Row */}
        <div className="class-details-row">
          <div className="class-details-input-details-group">
            <label htmlFor="teacherId">Teacher ID</label>
            <input type="text" id="teacherId" value={formData.teacherId} readOnly />
          </div>
          <div className="class-details-input-details-group">
            <label htmlFor="subjectId">Subject ID</label>
            <input type="text" id="subjectId" value={formData.subjectId} readOnly />
          </div>
          <div className="class-details-input-details-group">
            <label htmlFor="totalStudents">Total Students</label>
            <input
              type="number"
              id="totalStudents"
              value={formData.totalStudents}
              readOnly
            />
          </div>
        </div>

        {/* Third Row */}
        <div className="class-details-row">
          <div className="class-details-input-details-group">
            <label htmlFor="registeredBy">Registered By</label>
            <input type="text" id="registeredBy" value={formData.registeredBy} readOnly />
          </div>
          <div className="class-details-input-details-group">
            <label htmlFor="registeredDate">Registered Date</label>
            <input
              type="date"
              id="registeredDate"
              value={formData.registeredDate}
              readOnly
            />
          </div>
          <div className="class-details-input-details-group">
            <label htmlFor="updatedBy">Updated By</label>
            <input type="text" id="updatedBy" value={formData.updatedBy} readOnly />
          </div>
        </div>

        {/* Fourth Row */}
        <div className="class-details-row">
          <div className="class-details-input-details-group">
            <label htmlFor="fee">Fee (Rs.)</label>
            {isEditing ? (
              <input
                type="number"
                id="fee"
                value={formData.fee}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                type="text"
                id="fee"
                value={formData.fee}
                readOnly
              />
            )}
          </div>
          <div className="class-details-form-details-buttons">
            <button type="button" className="class-details-view-student-list-button">
              View Student List
            </button>
          </div>
        </div>

        {/* Time Slots */}
        {times.map((time, index) => (
          <div key={index} className="class-details-row">
            <div className="class-details-input-details-group">
              <label htmlFor={`day-${index}`}>Day</label>
              {isEditing ? (
                <select
                  id={`day-${index}`}
                  value={time.day}
                  onChange={(e) => handleTimeChange(index, e)}
                  required
                >
                  <option value="" disabled>Select Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id={`day-${index}`}
                  value={time.day}
                  readOnly
                />
              )}
            </div>
            <div className="class-details-input-details-group">
              <label htmlFor={`from-${index}`}>Class Time From</label>
              {isEditing ? (
                <input
                  type="time"
                  id={`from-${index}`}
                  value={time.from}
                  onChange={(e) => handleTimeChange(index, e)}
                  required
                />
              ) : (
                <input
                  type="text"
                  id={`from-${index}`}
                  value={time.from}
                  readOnly
                />
              )}
            </div>
            <div className="class-details-input-details-group">
              <label htmlFor={`to-${index}`}>Class Time To</label>
              {isEditing ? (
                <input
                  type="time"
                  id={`to-${index}`}
                  value={time.to}
                  onChange={(e) => handleTimeChange(index, e)}
                  required
                />
              ) : (
                <input
                  type="text"
                  id={`to-${index}`}
                  value={time.to}
                  readOnly
                />
              )}
            </div>
          </div>
        ))}

        {/* Add Time Slot Button */}
        {isEditing && (
          <button
            type="button"
            className="class-details-add-time-slot-button"
            onClick={addTimeSlot}
          >
            Add Time Slot
          </button>
        )}

        {/* Form Buttons */}
        <div className="class-details-form-buttons">
          {isEditing ? (
            <>
              <button type="submit" className="class-details-save-button">
                Save
              </button>
              <button type="button" className="class-details-cancel-button" onClick={toggleEditMode}>
                Cancel
              </button>
              <button type="button" className="class-details-reset-button" onClick={handleReset}>
                Reset
              </button>
            </>
          ) : (
            <button type="button" className="class-details-edit-button" onClick={toggleEditMode}>
              Edit
            </button>
          )}

        </div>
      </form>

      {/* Additional Buttons */}
      <div className="class-details-form-details-buttons">
        <button type="button" className="class-details-view-time-table-button">
          View Time Table
        </button>
        <button type="button" className="class-details-view-payment-button">
          View Payment
        </button>
        <button type="button" className="class-details-view-attendance-button">
          View Attendance
        </button>
        <button type="button" className="class-details-new-class-button">
          + New Class
        </button>
        <button type="button" className="class-details-remove-class-button">
          - Remove Class
        </button>
      </div>
    </div>
  );
};

export default ClassDetails;
