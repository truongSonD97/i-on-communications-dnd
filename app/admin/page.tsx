"use client";
import AdminProvider from "@/contexts/AdminContext";
import Admin from "./Admin";

export default function AdminPage() {
  
  return (
    <AdminProvider>
      <Admin/>
    </AdminProvider>
  );
}
