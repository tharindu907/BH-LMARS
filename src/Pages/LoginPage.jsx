// LoginPage.jsx

import React from 'react';
import './LoginPage.css'; // Create this CSS file for styling

const LoginPage = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <div className="navigation-bar">
        <div className="left-corner">
          Log in
        </div>
      </div>

      {/* Login Page Content */}
      <div className="login-page-content">
        {/* Left Column */}
        <div className="left-column">
          <h1>Attendance</h1>
          <h2>Bright Horizon Education Center</h2>
          <p>Bright Horizon Education Center is located in Idangoda Kiriella. It offers OL classes, AL classes, primary classes, as well as other classes like dancing and art.</p>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="login-window">
            <h3>Log in</h3>
            <form>
              <select className="user-type-select">
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="accountant">Accountant</option>
                <option value="staff">Staff</option>
              </select>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <div className="remember-me">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <button type="submit">Sign in</button>
            </form>
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div className="signup-link">
            Don't have an account? <a href="#"><span style={{ color: '#012970' }}>Signup here</span></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
