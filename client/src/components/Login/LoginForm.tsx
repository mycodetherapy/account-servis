import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginFormData } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

interface LoginFormProps {
  login: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({login}) => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post("http://localhost:5000/signin", data);
      console.log(response.data.result._id);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.result._id);
      login();
      navigate('/users');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Email" type="email" {...register("email")} fullWidth />
      <br />
      <TextField
        label="Password"
        type="password"
        {...register("password")}
        fullWidth
      />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  );
};
