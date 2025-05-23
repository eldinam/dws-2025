// app/users/new/page.tsx
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CreateUserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8000/users", data);
      router.push("/user"); // vrati se na listu usera
    } catch (error) {
      console.error("Greška prilikom dodavanja korisnika:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dodaj novog korisnika</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input {...register("username", { required: true })} />
          {errors.username && <p>Username je obavezan.</p>}
        </div>
        <div>
          <label>Email:</label>
          <input {...register("email", { required: true })} />
          {errors.email && <p>Email je obavezan.</p>}
        </div>
        <button type="submit">Spasi</button>
      </form>
    </div>
  );
}
