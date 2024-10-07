"use client";
import { Inter } from "next/font/google";
import DashboardLayout from "@/components/LayoutPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const queryClient = new QueryClient();
  useEffect(() => {
    keepLogin();
  }, []);

  const keepLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) router.push("/");
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}auth/keeplogin?token=${token}`
      );
    } catch (error) {
      router.push("/");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>
          <DashboardLayout>{children}</DashboardLayout>
        </body>
      </html>
    </QueryClientProvider>
  );
}
