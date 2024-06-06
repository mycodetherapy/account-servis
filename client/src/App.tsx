import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material';
import "./App.css";
import { Header } from './components/Header/Header';
import { UsersPage } from './components/Users/UsersPage';
import { EditProfilePage } from './components/Profile/EditProfileForm';
import { RegisterPage } from './components/Register/RegisterPage';
import { LoginPage } from './components/Login/LoginPage';

// export function App() {
//   return (
//     <>
//       <RegisterForm />
//       <LoginForm />
//     </>
//   );
// }

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            User Management
          </Typography>
          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/edit-profile">
                Edit Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/users" : "/login"} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />} />
          <Route path="/edit-profile" element={isAuthenticated ? <EditProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </Router>
  );
};

