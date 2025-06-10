"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Помилка на сторінці:", error);
  }, [error]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Щось пішло не так 😞</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Спробувати знову</button>
    </div>
  );
}
