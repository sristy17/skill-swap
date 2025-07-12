import "../styles/globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Skill Swap",
  description: "Barter your skills, not your wallet.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-white`}>
        <header className="w-full px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <h1 className="text-xl font-bold">🎯 Skill Swap</h1>
          <nav className="space-x-4 text-sm">
            <Link href="/dashboard" className="hover:text-indigo-400">Dashboard</Link>
            <Link href="/explore" className="hover:text-indigo-400">Explore</Link>
            <Link href="/swap-requests" className="hover:text-indigo-400">Requests</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}