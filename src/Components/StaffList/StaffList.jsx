import React, { useState, useEffect } from 'react';
import './StaffList.css';
import serchIcon from '../Assets/serchicon.png';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch the list of staff from the backend
    fetch('/api/staff') // Replace with the actual API endpoint
      .then(res => res.json())
      .then(data => setStaff(data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter staff based on search query
  const filteredStaff = staff.filter(staffMember => 
    staffMember.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="stl-staff-list">
      {/* Search Bar */}
      <div className="stl-window-search">
        <div className="stl-search-bar">
          <input
            type="text"
            className="stl-search-input"
            placeholder="Search Staff"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="stl-search-button">
            <img src={serchIcon} alt="Search" className="stl-search-img" />
          </button>
        </div>
      </div>

      {/* Staff List Table */}
      <div className="stl-window">
        <div className="stl-staff-table">
          <table>
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Staff Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.length > 0 ? (
                filteredStaff.map(staffMember => (
                  <tr key={staffMember.id}>
                    <td>{staffMember.id}</td>
                    <td>{staffMember.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No staff members found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffList;
