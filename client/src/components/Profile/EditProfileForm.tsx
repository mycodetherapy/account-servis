import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, CircularProgress, Box, Avatar } from '@mui/material';
import { EditProfile, User } from '../../types/types';

export const EditProfileForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<EditProfile>();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [isLoading, setIsLoading] = useState(true);
  const [thisUserData, setThidUserData] = useState<User | null>(null)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/account/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const userData = response.data.find((data: User) => data._id === userId)
        setProfilePhoto(`http://localhost:5000/${userData.profilePhoto}`);
        
        setValue('name', userData.name);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId, setValue]);

  const onSubmit = async (data: EditProfile) => {
    const formData = new FormData();
    
    formData.append('name', data.name);
    if (data.profilePhoto?.[0]) {
      formData.append('profilePhoto', data.profilePhoto[0]);
    }
    if (data.password) {
      formData.append('password', data.password);
    }
    if (newPhotoFile) {
        formData.append('profilePhoto', newPhotoFile);
    }
  

    try {
      const response = await axios.patch(`http://localhost:5000/api/account/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/users');
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

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//     //   setNewPhotoFile(e.target.files[0]);
//     let file = e.target.files[0];
//     setThidUserData((prev: any) => ({
//         ...prev,
//         profilePhoto: URL.createObjectURL(file)
//       }));
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target) {
//             setThidUserData((prev: any) => ({
//                 ...prev,
//                 profilePhoto: e.target?.result as string
//               }));
//           //setProfilePhoto(e.target.result as string);
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        <label>Profile Photo:</label>
          {profilePhoto && <Avatar src={profilePhoto} alt="Profile Photo" />}
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </div> 
      <TextField label="Name" {...register('name')} fullWidth />
      <br />
      <TextField label="Password" type="password" {...register('password')} fullWidth />
      <br />
      <Button variant="contained" component="label">
        Upload Profile Photo
        <input type="file" {...register('profilePhoto')} hidden />
      </Button>
      <br />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </form>
  );
};