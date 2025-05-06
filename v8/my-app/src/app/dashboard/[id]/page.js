"use client";

import { useParams } from "next/navigation";

export default function Dashboard() {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <h1>Welcome to Dashboard {id}</h1>
    </div>
  );
}
