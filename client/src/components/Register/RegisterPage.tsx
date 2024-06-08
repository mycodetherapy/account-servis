import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { RegisterFormData } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import defaultPhotoUrl from "../../images/defaultPhoto.jpg";
import { HOST_NAME } from "../../constants";

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("birthDate", data.birthDate);
    formData.append("gender", data.gender);
    if (newPhotoFile) {
      formData.append("profilePhoto", newPhotoFile);
    } else {
      try {
        const response = await fetch(defaultPhotoUrl);
        const blob = await response.blob();
        formData.append("profilePhoto", blob, "default-photo.jpg");
      } catch (error) {
        console.error("Error when uploading the default photo:", error);
      }
    }
    try {
      const response = await axios.post(
        `${HOST_NAME}/signup`,
        formData
      );
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhotoFile(e.target.files[0]);
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginTop: 2 }}>
        Register
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ textAlign: "center", minWidth: 300 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField label="Name" {...register("name", { required: true})} fullWidth />

          <TextField
            label="Email"
            type="email"
            {...register("email", { required: true})}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            {...register("password", { required: true })}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel shrink htmlFor="birthDate">
              Birth Date
            </InputLabel>
            <TextField
              id="birthDate"
              type="date"
              {...register("birthDate", { required: true })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ placeholder: "" }}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select {...register("gender", { required: true })}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            <FormHelperText>
              {errors.gender && "Please select your gender"}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={
              newPhotoFile ? URL.createObjectURL(newPhotoFile) : defaultPhotoUrl
            }
            alt="Profile Photo"
            sx={{ width: 200, height: 200, mt: 2 }}
          />

          <label htmlFor="profilePhoto">
            <input
              style={{ display: "none" }}
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <Button variant="contained" component="span" sx={{ margin: 2 }}>
              Upload Photo
            </Button>
          </label>
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      <Typography gutterBottom sx={{ marginTop: 2 }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </Typography>
    </Box>
  );
};
