import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginFormData } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import { HOST_NAME } from "../../constants";

interface LoginFormProps {
  login: () => void;
}

export const LoginPage: React.FC<LoginFormProps> = ({ login }) => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post(`${HOST_NAME}/signin`, data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.result._id);
      login();
      navigate("/people");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginTop: 2 }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "center", minWidth: 300 }}>
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <br />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          fullWidth
        />
        <br />
        <Button type="submit" variant="contained" color="primary" sx={{ margin: 2 }}>
          Login
        </Button>
      </form>
      <Typography>
        Don't have an account? <Link to="/register">Sign up</Link>
      </Typography>
    </Box>
  );
};
