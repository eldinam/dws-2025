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
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UplateList = () => {
  const router = useRouter();
  const [uplate, setUplate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "datum_uplate",
      headerName: "Datum uplate",
      width: 200,
      renderCell: (params) => dayjs(params.value).format("DD.MM.YYYY HH:mm:ss"),
    },
    { field: "ime_korisnika", headerName: "Korisnik", flex: 1 },
    { field: "naziv_usluge", headerName: "Naziv usluge", flex: 1 },
    { field: "kolicina", headerName: "Kolicina", flex: 1 },
    { field: "ukupno", headerName: "Ukupno", flex: 1 },
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

  const fetchUplate = async () => {
    try {
      const response = await axios.get("http://localhost:8000/uplata");
      setUplate(response.data);
    } catch (err) {
      console.error("Greška prilikom dobijanja uplata:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUplate();
  }, []);

  const handleCreate = () => {
    router.push("/uplate/new");
  };

  const handleEdit = (id) => {
    router.push(`/uplate/${id}/edit`);
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
      await axios.delete(`http://localhost:8000/uplata/${selectedId}`);
      setUplate((prev) => prev.filter((usluga) => usluga.id !== selectedId));
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
          Uplate
        </Typography>
        <Button variant="contained" sx={{ mb: 2 }} onClick={handleCreate}>
          Dodaj novu uplatu
        </Button>
        {/* <div style={{ height: 400, width: "100%" }}> */}
        <DataGrid
          rows={uplate}
          columns={columns}
          pageSize={5}
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
            Da li si siguran da želiš obrisati ovu uplatu? Ova radnja je
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

export default UplateList;
