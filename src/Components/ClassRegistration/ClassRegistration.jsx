import React, { useState } from 'react';
import './ClassRegistration.css';

const initialState = {
  teacherName: '',
  teacherId: '',
  subject: '',
  grade: '',
  fee: '',
  registeredDate: new Date().toISOString().slice(0, 10),
  registeredBy: '',
};

const defaultTeachers = [
  { id: 'T1', name: 'Teacher One' },
  { id: 'T2', name: 'Teacher Two' },
];

const defaultSubjects = ['Math', 'Science', 'History', 'English'];
const defaultGrades = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];
const defaultDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ClassRegistration = () => {
  const [formData, setFormData] = useState(initialState);
  const [times, setTimes] = useState([{ day: '', from: '', to: '', fee: '' }]);
  const [teachers] = useState(defaultTeachers);
  const [subjects] = useState(defaultSubjects);
  const [grades] = useState(defaultGrades);
  const [days] = useState(defaultDays);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleTimeChange = (index, e) => {
    const { id, value } = e.target;
    const newTimes = [...times];
    newTimes[index][id] = value;
    setTimes(newTimes);
  };

  const addTimeSlot = () => {
    setTimes([...times, { day: '', from: '', to: '', fee: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Class Added Successfully');
    setFormData(initialState);
    setTimes([{ day: '', from: '', to: '', fee: '' }]);
  };

  const handleReset = () => {
    setFormData(initialState);
    setTimes([{ day: '', from: '', to: '', fee: '' }]);
  };

  return (
    <div className="class-registration-form">
      <h1>Add New Class</h1>
      <form onSubmit={handleSubmit}>
        <div className="class-registration-form-row">
          <div className="class-registration-input-group">
            <label htmlFor="teacherName">Teacher Name</label>
            <select id="teacherName" value={formData.teacherName} onChange={handleChange} required>
              <option value="" disabled>Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.name} data-id={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="class-registration-input-group">
            <label htmlFor="subject">Subject</label>
            <select id="subject" value={formData.subject} onChange={handleChange} required>
              <option value="" disabled>Select Subject</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div className="class-registration-input-group">
            <label htmlFor="grade">Grade</label>
            <select id="grade" value={formData.grade} onChange={handleChange} required>
              <option value="" disabled>Select Grade</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="class-registration-form-row">
          <div className="class-registration-input-group">
            <label htmlFor="teacherId">Teacher ID</label>
            <input type="text" id="teacherId" value={formData.teacherId} readOnly />
          </div>
          <div className="class-registration-input-group">
            <label htmlFor="fee">Fee (Rs.)</label>
            <input
              type="number"
              id="fee"
              value={formData.fee}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {times.map((time, index) => (
          <div key={index} className="class-registration-form-row">
            <div className="class-registration-input-group">
              <label htmlFor={`day-${index}`}>Day</label>
              <select
                id={`day-${index}`}
                value={time.day}
                onChange={(e) => handleTimeChange(index, e)}
                required
              >
                <option value="" disabled>Select Day</option>
                {days.map(day => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="class-registration-input-group">
              <label htmlFor={`from-${index}`}>Class Time From</label>
              <input
                type="time"
                id={`from-${index}`}
                value={time.from}
                onChange={(e) => handleTimeChange(index, e)}
                required
              />
            </div>
            <div className="class-registration-input-group">
              <label htmlFor={`to-${index}`}>Class Time To</label>
              <input
                type="time"
                id={`to-${index}`}
                value={time.to}
                onChange={(e) => handleTimeChange(index, e)}
                required
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={addTimeSlot} className="class-registration-add-time-button">Add New Time Slot</button>

        <div className="class-registration-form-row">
          <div className="class-registration-input-group half-width">
            <label htmlFor="registeredDate">Registered Date</label>
            <input type="date" id="registeredDate" value={formData.registeredDate} readOnly />
          </div>
          <div className="class-registration-input-group half-width">
            <label htmlFor="registeredBy">Registered By</label>
            <input type="text" id="registeredBy" value={formData.registeredBy} readOnly />
          </div>
        </div>

        <div className="class-registration-form-buttons">
          <button type="button" onClick={handleReset} className="class-registration-reset-button">Reset</button>
          <button type="submit" className="class-registration-save-button">Save</button>
        </div>
      </form>
      <button type="button" className="class-registration-view-time-table-button">View Time Table</button>
    </div>
  );
};

export default ClassRegistration;
