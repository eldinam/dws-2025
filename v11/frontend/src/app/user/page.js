"use client";
import axios from "axios";
import { useRouter } from "next/navigation"; // dodaj na vrhu
import { useEffect, useState } from "react";
import styles from "../page.module.css";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // opcionalno
  const [error, setError] = useState(null); // opcionalno

  const router = useRouter();

  const handlePreview = (id) => {
    router.push(`/user/${id}`);
  };

  const handleCreate = () => {
    router.push("/user/new");
  };

  const usersGrid = () => {
    router.push("/user/grid");
  };

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Greška prilikom brisanja korisnika:", err);
    }
  };

  const handleAddUser = () => {
    alert("Dodaj novog korisnika (forma nije još implementirana)");
  };

  if (loading)
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p>Učitavanje korisnika...</p>
        </main>
      </div>
    );

  if (error)
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p>Došlo je do greške: {error.message}</p>
        </main>
      </div>
    );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <button onClick={handleCreate}>Dodaj novog usera</button>
        <button onClick={usersGrid}>Grid</button>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li key={user.id} style={{ margin: "10px 0" }}>
              <span>
                {user.username} - {user.email}
              </span>
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handlePreview(user.id)}
              >
                Pregledaj
              </button>
              <button
                style={{ marginLeft: "5px", color: "red" }}
                onClick={() => handleDelete(user.id)}
              >
                Briši
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
