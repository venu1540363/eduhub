import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material";
import './App.css';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import OtpVerificationPage from "./pages/OtpVerificationPage";
import ConfirmPasswordPage from "./pages/ConfirmPasswordPage";
import Registration from './pages/Registration';
import Courses from './pages/Courses';

const App = () => {
  const theme = createTheme({
    colors: {
      primary: "#9cadce",
      secondary: "#ffc107",
      background: "#fff",
      text: "#333",
      white: "#fff",
      black: "#000",
      heading: "#5f80bf",
      grey: "#ccc",
      lightText: "#444",
      dark: "#707e9a"
    },
    fontSizes: {
      small: "14px",
      medium: "16px",
      large: "18px",
      extraLarge: "20px",
    },
    padding: {
      small: "8px",
      medium: "16px",
      large: "24px",
      extraLarge: "32px",
      extreme: "60px"
    },
    screen: {
      list: "30%",
      large: "100%"
    },
    border: {
      small: "1px",
      medium: "2px"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/otp-verification" element={<OtpVerificationPage />} />
          <Route path="/confirm-password" element={<ConfirmPasswordPage />} />
          <Route path="/Courses" element={<Courses />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;