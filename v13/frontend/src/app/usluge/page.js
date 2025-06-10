"use client";
import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UslugeList = () => {
  const router = useRouter();
  const [usluge, setUsluge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "naziv", headerName: "Naziv", flex: 1 },
    { field: "cijena", headerName: "Cijena", flex: 1 },
    { field: "opis", headerName: "Opis", flex: 1 },
    {
      field: "actions",
      headerName: "Akcije",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEdit(params.row.id)}
          >
            Uredi
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleOpenDialog(params.row.id)}
          >
            Briši
          </Button>
        </Stack>
      ),
      width: 180,
    },
  ];

  const fetchUsluge = async () => {
    try {
      const response = await axios.get("http://localhost:8000/usluga");
      setUsluge(response.data);
    } catch (err) {
      console.error("Greška prilikom dobijanja korisnika:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsluge();
  }, []);

  const handleCreate = () => {
    router.push("/usluge/new");
  };

  const handleEdit = (id) => {
    router.push(`/usluge/${id}/edit`);
  };

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/usluga/${selectedId}`);
      setUsluge((prev) => prev.filter((usluga) => usluga.id !== selectedId));
      setSnackbarMessage("Usluga je uspješno obrisana.");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Greška prilikom brisanja:", err);
      setSnackbarMessage("Greška prilikom brisanja.");
      setSnackbarOpen(true);
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <Container>
      <Stack>
        <Typography variant="h5" color="black" gutterBottom>
          Usluge
        </Typography>
        <Button variant="contained" sx={{ mb: 2 }} onClick={handleCreate}>
          Dodaj novu uslugu
        </Button>
        {/* <div style={{ height: 400, width: "100%" }}> */}
        <DataGrid
          rows={usluge}
          columns={columns}
          pageSize={20}
          columnVisibilityModel={{
            id: false,
          }}
        />
        {/* </div> */}
      </Stack>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Potvrda brisanja</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Da li si siguran da želiš obrisati ovu uslugu? Ova radnja je
            nepovratna.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Ne</Button>
          <Button color="error" onClick={handleConfirmDelete} autoFocus>
            Da, obriši
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UslugeList;
