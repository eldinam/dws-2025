"use client";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const StatistikaChart = () => {
  const [statistika, setStatistika] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatistika = async () => {
    try {
      const response = await axios.get("http://localhost:8000/statistika");
      setStatistika(response.data);
    } catch (err) {
      console.error("Greška pri dohvatu statistike:", err);
      setError("Greška pri učitavanju podataka.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistika();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Učitavanje grafikona...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const barData = {
    labels: statistika.bar.map((item) => item.usluga),
    datasets: [
      {
        label: "Ukupno po usluzi",
        data: statistika.bar.map((item) => item.ukupno),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: statistika.pie.map((item) => item.korisnik),
    datasets: [
      {
        label: "Procentualni udio",
        data: statistika.pie.map((item) => item.procent),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
          "#36B37E",
          "#F06292",
          "#BA68C8",
        ],
      },
    ],
  };

  const lineData = {
    labels: statistika.line.map((item) => item.period),
    datasets: [
      {
        label: "Ukupno kroz vrijeme (sedmice)",
        data: statistika.line.map((item) => item.ukupno),
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Ukupni iznos po usluzi
        </Typography>
        <Bar data={barData} options={chartOptions} />
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Procentualni udio po korisnicima
        </Typography>
        <Pie data={pieData} options={chartOptions} />
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Ukupno kroz vrijeme (po sedmicama)
        </Typography>
        <Line data={lineData} options={chartOptions} />
      </Box>
    </Container>
  );
};

export default StatistikaChart;
