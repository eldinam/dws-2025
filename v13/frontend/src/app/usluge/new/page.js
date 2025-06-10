// app/users/new/page.tsx
"use client";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CreateUslugePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8000/usluga", data);
      router.push("/usluge");
    } catch (error) {
      console.error("Greška prilikom dodavanja usluge:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Dodaj novu uslugu
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

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Spasi
        </Button>
      </Box>
    </Container>
  );
}
