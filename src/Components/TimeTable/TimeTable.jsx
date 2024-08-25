import React, { useState } from "react";
import "./TimeTable.css";

const TimeTable = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [viewAs, setViewAs] = useState("");
  const [month, setMonth] = useState("");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [grade, setGrade] = useState("");
  const [showTable, setShowTable] = useState(false);

  const timetableData = [
    { period: "9:00 - 10:00", subject: "Mathematics", grade: "Grade 6", teacher: "John", conductDays: ["Monday", "Wednesday", "Friday"], dates: ["2024-08-01", "2024-08-05", "2024-08-07"] },
    { period: "10:00 - 11:00", subject: "Science", grade: "Grade 7", teacher: "Smith", conductDays: ["Tuesday", "Thursday"], dates: ["2024-08-02", "2024-08-04"] },
    { period: "11:00 - 12:00", subject: "History", grade: "Grade 8", teacher: "Lee", conductDays: ["Monday", "Friday"], dates: ["2024-08-01", "2024-08-08"] },
    { period: "12:00 - 1:00", subject: "English", grade: "Grade 9", teacher: "Taylor", conductDays: ["Wednesday", "Thursday"], dates: ["2024-08-03", "2024-08-06"] },
    { period: "1:00 - 2:00", subject: "Art", grade: "Grade 10", teacher: "Adams", conductDays: ["Monday", "Wednesday"], dates: ["2024-08-01", "2024-08-07"] },
    { period: "2:00 - 3:00", subject: "Mathematics", grade: "Grade 6", teacher: "John", conductDays: ["Tuesday", "Thursday"], dates: ["2024-08-02", "2024-08-05"] },
    { period: "3:00 - 4:00", subject: "Science", grade: "Grade 7", teacher: "Smith", conductDays: ["Monday", "Friday"], dates: ["2024-08-01", "2024-08-08"] },
  ];

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const subjects = ["Mathematics", "Art", "Science", "History", "English"];
  const grades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"];
  const teachers = ["John", "Smith", "Lee", "Taylor", "Adams"];

  const handleViewClick = () => {
    if (viewAs && month) {
      setShowTable(true);
    } else if (viewAs && !month) {
      alert("Please select a month to view the timetable.");
      setShowTable(false);
    } else {
      setShowTable(false);
    }
  };

  const renderTableHeaders = () => {
    switch (viewAs) {
      case "Month":
        return (
          <>
            <th>#</th>
            <th>Time Period</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Teacher</th>
            <th>Actions</th>
          </>
        );
      case "Subject":
        return (
          <>
            <th>#</th>
            <th>Time Period</th>
            <th>Grade</th>
            <th>Teacher</th>
            <th>Conduct Days per Week</th>
            <th>Dates</th>
            <th>Actions</th>
          </>
        );
      case "Grade":
        return (
          <>
            <th>#</th>
            <th>Time Period</th>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Conduct Days per Week</th>
            <th>Dates</th>
            <th>Actions</th>
          </>
        );
      case "Teacher":
        return (
          <>
            <th>#</th>
            <th>Time Period</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Conduct Days per Week</th>
            <th>Dates</th>
            <th>Actions</th>
          </>
        );
      default:
        return (
          <>
            <th>#</th>
            <th>Time Period</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Teacher</th>
            <th>Conduct Days per Week</th>
            <th>Dates</th>
            <th>Actions</th>
          </>
        );
    }
  };

  const renderTableRows = () => {
    return timetableData.map((item, index) => (
      <tr key={index}>
        <th>{index + 1}</th>
        <td>{item.period}</td>
        {/* Conditionally render Subject column */}
        {viewAs !== "Subject" && <td>{item.subject}</td>}

        {/* Conditionally render Grade column */}
        {viewAs !== "Grade" && <td>{item.grade}</td>}

        {/* Conditionally render Teacher column */}
        {viewAs !== "Teacher" && <td>{item.teacher}</td>}

        {/* Conditionally render Conduct Days per Week (hidden when viewAs is 'Month') */}
        {viewAs !== "Month" && (
          <td>{item.conductDays.slice(0, 3).join(", ")}</td>
        )}

        {/* Conditionally render Dates (hidden when viewAs is 'Month') */}
        {viewAs !== "Month" && <td>{item.dates.join(", ")}</td>}
        <td>
          <div className="action-buttons">
            <button className="edit-btn">Edit</button>
            <button className="viewdetails-btn">View Details</button>
            <button className="remove-btn">Remove Class</button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="timetable-container">
      <div className="top-section">
        <h2 className="timetable-title">Time Table</h2>
        <div className="header-right">
          <div className="year-selector">
            <span>Year:</span>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {[...Array(5).keys()].map(i => {
                const year = 2024 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="filter-box">
        <div className="filter-item">
          <div>View as:</div>
          <select 
            value={viewAs} 
            onChange={(e) => {
              setViewAs(e.target.value);
              setShowTable(false); // Hide table when changing view option
            }}
          >
            <option value="">Select</option>
            <option value="Month">Month</option>
            <option value="Subject">Subject</option>
            <option value="Teacher">Teacher</option>
            <option value="Grade">Grade</option>
          </select>
        </div>
        <div className="filter-item">
          <div>Month:</div>
          <select 
            value={month} 
            onChange={(e) => {
              setMonth(e.target.value);
              setShowTable(false); // Hide table when changing month
            }}
            disabled={!viewAs}
          >
            <option value="">Select Month</option>
            {months.map((m, index) => (
              <option key={index} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <div>Subject:</div>
          <select 
            value={subject} 
            onChange={(e) => {
              setSubject(e.target.value);
              setShowTable(false); // Hide table when changing subject
            }}
            disabled={!viewAs}
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
            onChange={(e) => {
              setTeacher(e.target.value);
              setShowTable(false); // Hide table when changing teacher
            }}
            disabled={!viewAs}
          >
            <option value="">All</option>
            {teachers.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <div>Grade:</div>
          <select 
            value={grade} 
            onChange={(e) => {
              setGrade(e.target.value);
              setShowTable(false); // Hide table when changing grade
            }}
            disabled={!viewAs}
          >
            <option value="">All</option>
            {grades.map((value, index) => (
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
