"use client";
import React from "react";
import HomePage from "../../views/home-page";

// We need to ensure HomePage is exported correctly from views/home-page
// It was 'export default HomePage' and 'export const HomePage'.

export default function Page({ params }: { params: { lang: string } }) {
  return <HomePage />;
}
