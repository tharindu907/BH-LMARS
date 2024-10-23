import React, { useState } from 'react';
import searchIcon from '../Assets/serchicon.png';
import axios from 'axios';
import './ClassDetails.css';

const initialState = {
  teacherName: '',
  teacherId: '',
  subject: '',
  classId: '',
  grade: '',
  medium: '',
  schedule: [],
  fee: '',
  registeredDate: '',
  registeredBy: ''
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ClassDetails = () => {
  const [formData, setFormData] = useState(initialState);
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  
  const [times, setTimes] = useState([{ day: '', from: '', to: '' }]);
  const [editEnabled, setEditEnabled] = useState(false);

  const handleSearch = async () => {
    try {
      if (searchId) {
        const responsefordetails = await axios.get(`http://localhost:5000/class/get/classdetails/${searchId}`);

        if (!responsefordetails.data) {
          setErrorMessage('Invalid ClassID');
          setFormData(initialState)

        } else {
          setErrorMessage('');
          setFormData({
            teacherName: responsefordetails.data.teacherName,
            teacherId: responsefordetails.data.classdetails.teacherid,
            subject: responsefordetails.data.classdetails.subject,
            classId: responsefordetails.data.classdetails._id,
            grade: responsefordetails.data.classdetails.grade,
            medium: responsefordetails.data.classdetails.medium,
            schedule: responsefordetails.data.classdetails.schedule,
            fee: responsefordetails.data.classdetails.fee,
            registeredDate: responsefordetails.data.classdetails.registered_date.slice(0, 10),
            registeredBy: responsefordetails.data.classdetails.registered_by
          });

          setTimes(responsefordetails.data.classdetails.schedule);
        }
      } else {
        setErrorMessage('Enter a ClassID');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Server error occurred');
      setFormData(initialState);
      setTimes([{ day: '', from: '', to: '' }]);
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleTimeChange = (index, field, value) => {
    setTimes((prevTimes) => {
      const newTimes = [...prevTimes];
      newTimes[index][field] = value;
      return newTimes;
    });
  };

  const addTimeSlot = () => {
    setTimes([...times, { day: '', from: '', to: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const update = await axios.put(`http://localhost:5000/class/update/classdetails/${formData.classId}`, {
        fee: formData.fee,
        schedule: times
      });

      if (update.status === 200) {
        alert('Class Updated Successfully');
        setEditEnabled(false);
        handleSearch(); // Re-fetch the updated class details
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
    if (!editEnabled && Array.isArray(formData.schedule)) {
      setTimes(formData.schedule);
    }
    setEditEnabled(!editEnabled);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditEnabled(false);
    handleSearch(); // Exit edit mode
  };

  return (
    <div className="class-details-form">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Class"
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
          {/* First Row */}
          <div className="class-details-row">
            <div className="class-details-input-details-group">
                <label htmlFor="subjectId">ClassID</label>
                <input 
                  type="text" 
                  id="subjectId" 
                  value={formData.classId} 
                  readOnly />
            </div>

            <div className="class-details-input-details-group">
              <label htmlFor="teacherName">Teacher Name</label>
              <input
                  type="text"
                  id="teacherName"
                  value={formData.teacherName}
                  readOnly
                />
            </div>

            <div className="class-details-input-details-group">
              <label htmlFor="teacherId">TeacherID</label>
              <input 
                type="text" 
                id="teacherId" 
                value={formData.teacherId} 
                readOnly 
              />
            </div>

          </div>

          {/* Second Row */}
          <div className="class-details-row">

            <div className="class-details-input-details-group">
                <label htmlFor="subject">Subject</label>
                <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    readOnly
                />
            </div>

            <div className="class-details-input-details-group">
              <label htmlFor="grade">Grade</label>
              <input
                  type="text"
                  id="grade"
                  value={formData.grade}
                  readOnly
              />
            </div>

            <div className="class-details-input-details-group">
              <label htmlFor="fee">Fee (Rs.)</label>
              {editEnabled ? (
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
          </div>

          {/* Third Row */}
          <div className="class-details-row">

            <div className="class-details-input-details-group">
              <label htmlFor="registeredBy">Registered By</label>
              <input 
                type="text" 
                id="registeredBy" 
                value={formData.registeredBy} 
                readOnly 
              />
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
          </div>

          {/* Time Slots */}
          {times.map((time, index) => (
            <div key={index} className="class-details-row">

              <div className="class-details-input-details-group">
                <label htmlFor={`day-${index}`}>Day</label>
                {editEnabled ? (
                  <select
                    value={time.day}
                    onChange={(e) => handleTimeChange(index, 'day', e.target.value)}
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
                <label htmlFor={`from-${index}`}>From</label>
                {editEnabled ? (
                  <input
                    type="time"
                    value={time.from}
                    onChange={(e) => handleTimeChange(index, 'from', e.target.value)}
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
                <label htmlFor={`to-${index}`}>To</label>
                {editEnabled ? (
                  <input
                    type="time"
                    value={time.to}
                    onChange={(e) => handleTimeChange(index, 'to', e.target.value)}
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
          {editEnabled && (
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
            {editEnabled ? (
              <>
                <button type="submit" className="class-details-save-button" onClick={handleSubmit}>
                  Save
                </button>
                <button type="button" className="class-details-cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button type="button" className="class-details-edit-button" onClick={toggleEditMode}>
                Edit
              </button>
            )}

          </div>
        </form>
      )}
    </div>
  );
};

export default ClassDetails;
