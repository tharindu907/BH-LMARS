import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Dashboard from './Components/Dashboard/Dashboard';
import { UserProvider } from './Context/UserContext';
import LoginPage from './Pages/LoginPage';
import AdminPage from './Pages/AdminPage.jsx';
import AccountantPage from './Pages/AccountantPage';
import StudentPage from './Pages/StudentPage';
import TeacherPage from './Pages/TeacherPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('login');
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      // Simulate fetching user data
      const userData = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            isLoggedIn: true,
            userType: 'Student',
            username: 'JohnDoe', // Replace with '' to test default username
            profilePic: '', // Replace with '' to test default profile picture
          });
        }, 1000);
      });

      setIsLoggedIn(userData.isLoggedIn);
      setUserType(userData.userType);
      setUsername(userData.username || 'User');
      setProfilePic(userData.profilePic || '/Assets/default-profile-pic.png');
    };

    fetchUserData();
  }, []);

  return (
    <UserProvider value={{ isLoggedIn, userType, username, profilePic }}>
      <Router>
        <div className="app">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} setUsername={setUsername} setProfilePic={setProfilePic} />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/accountant" element={<AccountantPage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/teacher" element={<TeacherPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
