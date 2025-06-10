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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function EditUplatePage() {
  const { id } = useParams(); // ID iz URL-a
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      korisnik_id: "",
      usluga_id: "",
      kolicina: 1,
      datum_uplate: "", // <-- dodano
    },
  });

  const [korisnici, setKorisnici] = useState([]);
  const [usluge, setUsluge] = useState([]);
  const [cijenaUsluge, setCijenaUsluge] = useState(0);

  const kolicina = watch("kolicina");
  const uslugaId = watch("usluga_id");

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

  // Dohvati postojeću uplatu
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/uplata/${id}`).then((res) => {
        const uplata = res.data;
        setValue("korisnik_id", uplata.korisnik_id.toString());
        setValue("usluga_id", uplata.usluga_id.toString());
        setValue("kolicina", uplata.kolicina);
        if (uplata.datum_uplate) {
          const formatted = dayjs(uplata.datum_uplate).format(
            "YYYY-MM-DDTHH:mm"
          );
          setValue("datum_uplate", formatted);
        }
      });
    }
  }, [id, setValue]);

  // Kada se promijeni usluga, izračunaj cijenu
  useEffect(() => {
    const selected = usluge.find((u) => u.id === parseInt(uslugaId));
    if (selected) {
      setCijenaUsluge(selected.cijena);
    }
  }, [uslugaId, usluge]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:8000/uplata/${id}`, {
        korisnik_id: parseInt(data.korisnik_id),
        usluga_id: parseInt(data.usluga_id),
        kolicina: parseInt(data.kolicina),
        datum_uplate: dayjs(data.datum_uplate).toISOString(),
      });
      router.push("/uplate");
    } catch (error) {
      console.error("Greška prilikom ažuriranja uplate:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Uredi uplatu
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Korisnik */}
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

        {/* Usluga */}
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

        {/* Količina */}
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

        {/* Datum uplate */}
        <Controller
          name="datum_uplate"
          control={control}
          rules={{ required: "Datum i vrijeme uplate su obavezni." }}
          render={({ field }) => (
            <TextField
              label="Datum i vrijeme uplate"
              type="datetime-local"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...field}
              error={!!errors.datum_uplate}
              helperText={errors.datum_uplate?.message}
            />
          )}
        />

        {/* Ukupno */}
        <TextField
          label="Ukupno"
          value={isNaN(ukupno) ? "" : `${ukupno.toFixed(2)} KM`}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Spasi promjene
        </Button>
      </Box>
    </Container>
  );
}
