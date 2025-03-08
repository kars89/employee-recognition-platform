"use client";

import RootLayout from "./layout.server";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout children={children} session={null} />;
}
