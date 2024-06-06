import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { User } from "../../types/types";

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) throw new Error("Необходима авторизация");

        const response = await axios.get("http://localhost:5000/api/people", {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        User List
      </Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={user._id}>
            <ListItemAvatar>
              <Avatar
                src={user.profilePhoto ? `http://localhost:5000/${user.profilePhoto}` : ""}
              />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
