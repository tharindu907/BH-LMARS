import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ setIsLoggedIn, setUserType, setUsername, setProfilePic }) {
  const [selectedUserType, setSelectedUserType] = useState('Admin');
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login process
    setIsLoggedIn(true);
    setUserType(selectedUserType);
    setUsername(inputUsername || 'User');
    setProfilePic('/Assets/default-profile-pic.png'); // Add logic to fetch user profile pic if available

    // Navigate to the respective dashboard
    navigate(`/${selectedUserType.toLowerCase()}`);
  };

  return (
    <div className="login-page">
      <div className="left-column">
        <h1>Attendance</h1>
        <h2>Bright Horizon Education Center</h2>
        <p>
          Bright Horizon Education Center is located in Idangoda Kiriella. It has OL classes, AL classes, other primary
          classes, and other classes like dancing, art, etc.
        </p>
      </div>
      <div className="right-column">
        <div className="login-window">
          <h2>Login</h2>
          <div className="user-type">
            <label>
              <input
                type="radio"
                value="Admin"
                checked={selectedUserType === 'Admin'}
                onChange={(e) => setSelectedUserType(e.target.value)}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                value="Accountant"
                checked={selectedUserType === 'Accountant'}
                onChange={(e) => setSelectedUserType(e.target.value)}
              />
              Accountant
            </label>
            <label>
              <input
                type="radio"
                value="Teacher"
                checked={selectedUserType === 'Teacher'}
                onChange={(e) => setSelectedUserType(e.target.value)}
              />
              Teacher
            </label>
            <label>
              <input
                type="radio"
                value="Student"
                checked={selectedUserType === 'Student'}
                onChange={(e) => setSelectedUserType(e.target.value)}
              />
              Student
            </label>
          </div>
          <label>
            Username:
            <input type="text" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
          </label>
          <label className="remember-me">
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            Remember me
          </label>
          <button onClick={handleLogin}>Sign In</button>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
