"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ padding: 20 }}>
        <h1>Глобальна помилка 😱</h1>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Спробувати знову</button>
      </body>
    </html>
  );
}
