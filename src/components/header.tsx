"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("loggedIn");
    setIsLoggedIn(token === "true");
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="w-full px-6 py-4 border-b border-gray-800 flex justify-between items-center">
      <h1 className="text-xl font-bold">🎯 Skill Swap</h1>
      <nav className="space-x-4 text-sm">
        <Link href="/dashboard" className="hover:text-indigo-400">Dashboard</Link>
        <Link href="/explore" className="hover:text-indigo-400">Explore</Link>
        <Link href="/swap-requests" className="hover:text-indigo-400">Requests</Link>

        {isLoggedIn ? (
          <Link href="/profile/edit" className="hover:text-green-400">Profile</Link>
        ) : (
          <Link href="/login" className="hover:text-indigo-400">Login</Link>
        )}
      </nav>
    </header>
  );
}
