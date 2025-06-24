"use client";

import "./loading.scss";

export default function Loading() {
  return (
    <div className="book-loading-container">
      <div className="book">
        <div className="book-cover" />
        <div className="book-pages">
          <div className="page" />
          <div className="page" />
          <div className="page" />
        </div>
      </div>
      <p className="loading-text">Завантаження категорій...</p>
    </div>
  );
}
