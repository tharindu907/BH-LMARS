import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import { UserProvider } from './Context/UserContext';
import LoginPage from './Pages/LoginPage';
import AdminPage from './Pages/AdminPage';
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
    if (isLoggedIn) {
      // Simulate fetching user data
      const fetchUserData = async () => {
        const userData = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              userType: 'Student',
              username: 'John', // Replace with '' to test default username
              profilePic: '', // Replace with '' to test default profile picture
            });
          }, 1000);
        });

        setUserType(userData.userType);
        setUsername(userData.username || 'User');
        setProfilePic(userData.profilePic || '');
      };

      fetchUserData();
    }
  }, [isLoggedIn]);

  return (
    <UserProvider value={{ isLoggedIn, userType, username, profilePic }}>
      <Router>
        <div className="app">
          <NavigationBar />
          <Routes>
            <Route
              path="/"
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} setUsername={setUsername} setProfilePic={setProfilePic} />}
            />
            {isLoggedIn && userType === 'Admin' && (
              <Route path="/admin/*" element={<AdminPage />} />
            )}
            {isLoggedIn && userType === 'Accountant' && (
              <Route path="/accountant" element={<AccountantPage />} />
            )}
            {isLoggedIn && userType === 'Student' && (
              <Route path="/student" element={<StudentPage />} />
            )}
            {isLoggedIn && userType === 'Teacher' && (
              <Route path="/teacher" element={<TeacherPage />} />
            )}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
