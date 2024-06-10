import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, Avatar, Typography } from "@mui/material";
import { EditProfileFormData, UserProfile } from "../../types/types";
import { HOST_NAME } from "../../constants";

export const EditProfilePage: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<EditProfileFormData>();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<UserProfile>(
          `${HOST_NAME}/api/account/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const userData = response.data;
        setProfilePhoto(`${HOST_NAME}/${userData.profilePhoto}`);
        setValue("name", userData.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId, setValue]);

  const onSubmit = async (data: EditProfileFormData) => {
    const formData = new FormData();
    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.profilePhoto?.[0]) {
      formData.append("profilePhoto", data.profilePhoto[0]);
    }
    if (data.password) {
      formData.append("password", data.password);
    }
    if (newPhotoFile) {
      formData.append("profilePhoto", newPhotoFile);
    }
    try {
      const response = await axios.patch(
        `${HOST_NAME}/api/account/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/people");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhotoFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setProfilePhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginTop: 2 }}>
        Edit Profile
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ textAlign: "center", maxWidth: 400 }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          {profilePhoto && (
            <Avatar
              src={profilePhoto}
              alt="Profile Photo"
              sx={{ width: 200, height: 200, mt: 2 }}
            />
          )}
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
        <TextField
          label="Name"
          {...register("name")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          {...register("password")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ alignSelf: "center" }}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};
