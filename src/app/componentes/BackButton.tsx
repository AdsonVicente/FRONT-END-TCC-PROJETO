"use client";

import React from "react";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
    >
      <span>&larr;</span>
      <span>Voltar</span>
    </button>
  );
}
