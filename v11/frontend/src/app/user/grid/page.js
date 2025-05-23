"use client";
import { Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "username", headerName: "Username", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
];

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // opcionalno
  const [error, setError] = useState(null); // opcionalno

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Greška prilikom dobijanja korisnika:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={users} columns={columns} pageSize={5} />
      </div>
    </Container>
  );
};

export default UserList;
