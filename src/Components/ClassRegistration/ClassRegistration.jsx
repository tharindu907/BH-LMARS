import React, { useState } from 'react';
import './ClassRegistration.css';
import axios from 'axios';

const initialState = {
  teacherName: '',
  teacherId: '',
  subject: '',
  grade: '',
  fee: '',
  medium: '',
  registeredDate: new Date().toISOString().slice(0, 10),
  registeredBy: '',
};

const ClassRegistration = () => {
  const [formData, setFormData] = useState(initialState);
  const [schedule, setSchedules] = useState([{ day: '', from: '', to: ''}]);
  const [teacherName, setTeacherName] = useState('');

  const handleChange = async (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (id === 'teacherId') {
      try {
        const response = await axios.get(`http://localhost:5000/user/get/nameFromTeacherId`, {
          params: { teacherID: value }
        });
        setTeacherName(response.data.teacherName);
      } catch (error) {
        console.error('Failed to fetch teacher name:', error);
        setTeacherName(''); // Reset teacher name on error
      }
    }
  };

  const handleScheduleChange = (index, e) => {
    const { name, value } = e.target;
    const newSchedules = [...schedule];
    newSchedules[index][name] = value;
    setSchedules(newSchedules);
  };

  const addTimeSlot = () => {
    setSchedules([...schedule, { day: '', from: '', to: ''}]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const classData  = {
      teacherid: formData.teacherId,
      subject: formData.subject,
      grade: formData.grade,
      fee: formData.fee,
      medium: formData.medium,
      schedule: schedule,
      registered_date: formData.registeredDate,
      registered_by: formData.registeredBy,
    };

    try {
      const response = await axios.post('http://localhost:5000/class/add', classData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      alert('Class Added Successfully');
      setFormData(initialState);
      setSchedules([{ day: '', from: '', to: ''}]);
    } catch (error) {
      console.error('Failed to add class:', error);
      alert('Error adding class');
    }
  };

  const handleReset = () => {
    setFormData(initialState);
    setSchedules([{ day: '', from: '', to: ''}]);
  };

  return (
    <div className="class-registration-form">
      <h1>Add New Class</h1>
      <form onSubmit={handleSubmit}>
        <div className="class-registration-form-row">
          <div className="class-registration-input-group">
            <label htmlFor="teacherId">Teacher ID</label>
            <input
              type="text"
              id="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
            />
          </div>
          <div className="class-registration-input-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="class-registration-input-group">
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              id="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="class-registration-form-row">
          <div className="class-registration-input-group">
            <label htmlFor="teacherName">Teacher Name</label>
            <input
              type="text"
              id="teacherName"
              value={teacherName}
              readOnly
            />
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
          <div className="class-registration-input-group">
            <label htmlFor="medium">Medium</label>
            <select id="medium" value={formData.medium} onChange={handleChange} required>
              <option value="">Select Medium</option>
              <option value="English">English</option>
              <option value="Sinhala">Sinhala</option>
              <option value="Tamil">Tamil</option>
            </select>
          </div>
        </div>

        {schedule.map((time, index) => (
          <div key={index} className="class-registration-form-row">
            <div className="class-registration-input-group">
              <label htmlFor={`day-${index}`}>Day</label>
              <input
                type="text"
                name="day"
                value={time.day}
                onChange={(e) => handleScheduleChange(index, e)}
                required
              />
            </div>
            <div className="class-registration-input-group">
              <label htmlFor={`from-${index}`}>From</label>
              <input
                type="time"
                name="from"
                value={time.from}
                onChange={(e) => handleScheduleChange(index, e)}
                required
              />
            </div>
            <div className="class-registration-input-group">
              <label htmlFor={`to-${index}`}>To</label>
              <input
                type="time"
                name="to"
                value={time.to}
                onChange={(e) => handleScheduleChange(index, e)}
                required
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addTimeSlot}
          className="class-registration-add-time-button"
        >
          Add New Time Slot
        </button>

        <div className="class-registration-form-row">
          <div className="class-registration-input-group half-width">
            <label htmlFor="registeredDate">Registered Date</label>
            <input type="date" id="registeredDate" required value={formData.registeredDate} onChange={handleChange} />
          </div>
          <div className="class-registration-input-group half-width">
            <label htmlFor="registeredBy">Registered By</label>
            <input
              type="text"
              id="registeredBy"
              value={formData.registeredBy}
              onChange={handleChange} // Removed readOnly for input
            />
          </div>
        </div>

        <div className="class-registration-form-buttons">
          <button
            type="button"
            onClick={handleReset}
            className="class-registration-reset-button"
          >
            Reset
          </button>
          <button type="submit" className="class-registration-save-button">
            Save
          </button>
        </div>
      </form>
      <button type="button" className="class-registration-view-time-table-button">
        View Time Table
      </button>
    </div>
  );
};

export default ClassRegistration;
