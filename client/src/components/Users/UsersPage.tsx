import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  ListItemText,
  Avatar,
  Grid,
} from "@mui/material";
import { User } from "../../types/types";
import moment from "moment";
import { Box } from "@mui/system";
import { HOST_NAME } from "../../constants";

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authorization is required.");

        const response = await axios.get(`${HOST_NAME}/api/people`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ marginTop: 2 }}
      >
        User List
      </Typography>
      <Grid container spacing={3} sx={{ maxWidth: "1200px" }}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 3,
                backgroundColor: "#F0F8FF",
                border: "1px solid gray",
                height: "100%",
                boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Avatar
                src={
                  user.profilePhoto
                    ? `${HOST_NAME}/${user.profilePhoto}`
                    : ""
                }
                sx={{ width: 200, height: 200, margin: 3 }}
              />
              <ListItemText primary={user.name} sx={{ textAlign: "center" }} />
              <ListItemText
                primary={moment(user.birthDate).format("DD.MM.YYYY")}
                sx={{ textAlign: "center", paddingBottom: 2 }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
