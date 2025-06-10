"use client";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditUslugaPage() {
  const router = useRouter();
  const params = useParams(); // dohvaća [id] iz URL-a
  const id = params.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsluga = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/usluga/${id}`);
        reset(response.data); // popuni formu podacima
      } catch (error) {
        console.error("Greška prilikom dohvata usluge:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUsluga();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:8000/usluga/${id}`, data);
      router.push("/usluge");
    } catch (error) {
      console.error("Greška prilikom ažuriranja usluge:", error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Uredi uslugu
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Naziv"
          fullWidth
          margin="normal"
          {...register("naziv", { required: "Naziv je obavezan." })}
          error={!!errors.naziv}
          helperText={errors.naziv?.message}
        />

        <TextField
          label="Cijena"
          fullWidth
          margin="normal"
          type="number"
          inputProps={{ step: "0.01" }}
          {...register("cijena", {
            required: "Cijena je obavezna.",
            valueAsNumber: true,
          })}
          error={!!errors.cijena}
          helperText={errors.cijena?.message}
        />

        <TextField
          label="Opis"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          {...register("opis", { required: "Opis je obavezan." })}
          error={!!errors.opis}
          helperText={errors.opis?.message}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          Spasi promjene
        </Button>
      </Box>
    </Container>
  );
}
