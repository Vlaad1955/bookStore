"use client";

import "./loading.scss";

export default function Loading() {
  return (
    <div className="auth-loading-wrapper">
      <div className="auth-spinner">
        <div className="avatar">
          <div className="head" />
          <div className="body" />
        </div>
      </div>
      <p className="auth-loading-text">Авторизація...</p>
    </div>
  );
}
