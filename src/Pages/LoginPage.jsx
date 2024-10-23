import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoIcon from '../Components/Assets/bgi.png';
import './LoginPage.css';

function LoginPage({ setIsLoggedIn, setUserType, setUsername, setProfilePic }) {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: inputUsername,
        password: inputPassword,
      });

      const { username, role } = response.data;
      
      setIsLoggedIn(true);
      setUserType(role);
      setUsername(username);
      setProfilePic('/Assets/default-profile-pic.png'); // Add logic to fetch user profile pic if available

      // Navigate to the respective dashboard
      navigate(`/${role.toLowerCase()}`);
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Server Error');
    }
  };
  return (
    <div className="login-page">
      <div className="left-column">
        <img src={logoIcon} alt="Logo" />
        <h1>Bright Horizon Education Center</h1>
        <p>
          Bright Horizon Education Center is located in Idangoda Kiriella. It has OL classes, AL classes, other primary
          classes, and other classes like dancing, art, etc.
        </p>
      </div>
      <div className="right-column">
        <div className="login-window">
          <label>
            Username
            <input type="text" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
          </label>
          <label className="remember-me">
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            Remember me
          </label>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={handleLogin}>Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
