import React, { useLayoutEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import "./App.css";
import { UsersPage } from "./components/Users/UsersPage";
import { RegisterPage } from "./components/Register/RegisterPage";
import { LoginPage } from "./components/Login/LoginPage";
import axios from "axios";
import { Box } from "@mui/system";
import { EditProfilePage } from "./components/Profile/EditProfilePage";

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useLayoutEffect(() => {
    
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            "http://localhost:5000/api/checkToken",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setIsAuthenticated(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 300);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }
      }
    };
    checkToken();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            User Management
          </Typography>
          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/account">
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
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/users" : "/login"} />}
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <UsersPage />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/users"
            element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/account"
            element={
              isAuthenticated ? <EditProfilePage /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};
