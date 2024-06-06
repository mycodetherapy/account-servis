import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginFormData } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  login: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({login}) => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post("http://localhost:5000/signin", data);
      console.log(response.data);
      localStorage.setItem('token', response.data.token); // Сохранение токена в localStorage
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
