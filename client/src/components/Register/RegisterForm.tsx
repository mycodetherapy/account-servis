import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { RegisterFormData } from "../../types/types";
import { useNavigate } from "react-router-dom";
//import { useHistory } from 'react-router-dom';

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("birthDate", data.birthDate);
    formData.append("gender", data.gender);
    if (data.profilePhoto.length > 0) {
      formData.append("profilePhoto", data.profilePhoto[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        formData
      );
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Name" {...register("name")} fullWidth />
      <br />
      <TextField label="Email" type="email" {...register("email")} fullWidth />
      <br />
      <TextField
        label="Password"
        type="password"
        {...register("password")}
        fullWidth
      />
      <br />
      <TextField
        label="Birth Date"
        type="date"
        {...register("birthDate")}
        fullWidth
      />
      <br />
      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <Select {...register("gender")}>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        <FormHelperText>
          {errors.gender && "Please select your gender"}
        </FormHelperText>
      </FormControl>
      <br />
      <input type="file" {...register("profilePhoto")} />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>
  );
};
