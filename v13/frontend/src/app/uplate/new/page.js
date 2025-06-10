"use client";

import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function CreateUplatePage() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      korisnik_id: "",
      usluga_id: "",
      kolicina: 1,
    },
  });

  const router = useRouter();
  const [korisnici, setKorisnici] = useState([]);
  const [usluge, setUsluge] = useState([]);
  const [cijenaUsluge, setCijenaUsluge] = useState(0);

  const kolicina = watch("kolicina");
  const uslugaId = watch("usluga_id");

  // Izračunaj ukupno
  const ukupno = kolicina * cijenaUsluge;

  // Dohvati korisnike i usluge
  useEffect(() => {
    axios.get("http://localhost:8000/korisnik").then((res) => {
      setKorisnici(res.data);
    });

    axios.get("http://localhost:8000/usluga").then((res) => {
      setUsluge(res.data);
    });
  }, []);

  // Kada se promijeni usluga, nađi njenu cijenu
  useEffect(() => {
    const selected = usluge.find((u) => u.id === parseInt(uslugaId));
    if (selected) {
      setCijenaUsluge(selected.cijena);
    }
  }, [uslugaId, usluge]);

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8000/uplata", {
        korisnik_id: parseInt(data.korisnik_id),
        usluga_id: parseInt(data.usluga_id),
        kolicina: parseInt(data.kolicina),
        datum_uplate: dayjs().toISOString(), // trenutno vrijeme
      });
      router.push("/uplate");
    } catch (error) {
      console.error("Greška prilikom dodavanja uplate:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Dodaj novu uplatu
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Odabir korisnika */}
        <Controller
          name="korisnik_id"
          control={control}
          rules={{ required: "Korisnik je obavezan." }}
          render={({ field }) => (
            <TextField
              select
              label="Korisnik"
              fullWidth
              margin="normal"
              {...field}
              error={!!errors.korisnik_id}
              helperText={errors.korisnik_id?.message}
            >
              {korisnici.map((k) => (
                <MenuItem key={k.id} value={k.id}>
                  {k.ime} {k.prezime}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Odabir usluge */}
        <Controller
          name="usluga_id"
          control={control}
          rules={{ required: "Usluga je obavezna." }}
          render={({ field }) => (
            <TextField
              select
              label="Usluga"
              fullWidth
              margin="normal"
              {...field}
              error={!!errors.usluga_id}
              helperText={errors.usluga_id?.message}
            >
              {usluge.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.naziv} ({u.cijena} KM)
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Unos količine */}
        <Controller
          name="kolicina"
          control={control}
          rules={{
            required: "Količina je obavezna.",
            min: { value: 1, message: "Minimalna količina je 1." },
          }}
          render={({ field }) => (
            <TextField
              label="Količina"
              type="number"
              fullWidth
              margin="normal"
              {...field}
              error={!!errors.kolicina}
              helperText={errors.kolicina?.message}
            />
          )}
        />

        {/* Prikaz ukupnog iznosa */}
        <TextField
          label="Ukupno"
          value={isNaN(ukupno) ? "" : `${ukupno.toFixed(2)} KM`}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Spasi
        </Button>
      </Box>
    </Container>
  );
}
