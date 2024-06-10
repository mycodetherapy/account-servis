import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  ListItemText,
  Avatar,
  Grid,
  Pagination,
} from "@mui/material";
import { PaginatedUsersResponse, UserBase } from '../../types/types';
import moment from "moment";
import { Box } from "@mui/system";
import { CARD_LIMIT, HOST_NAME } from "../../constants";

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserBase[]>([]);
  const [currentPage, setCurrentPage] = useState<PaginatedUsersResponse['currentPage']>(1);
  const [totalPages, setTotalPages] = useState<PaginatedUsersResponse['totalPages']>(1);

  const fetchUsers = async (page: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization is required.");

      const response = await axios.get<PaginatedUsersResponse>(
        `${HOST_NAME}/api/people?page=${page}&limit=${CARD_LIMIT}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
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
                  user.profilePhoto ? `${HOST_NAME}/${user.profilePhoto}` : ""
                }
                sx={{ width: 200, height: 200, marginTop: 5, marginBottom: 2 }}
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
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};
