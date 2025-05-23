// app/users/[id]/page.tsx
"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Greška prilikom dobijanja korisnika:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Učitavanje korisnika...</p>;

  if (!user) return <p>Korisnik nije pronađen.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Detalji korisnika</h1>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
}
