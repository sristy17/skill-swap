import "../styles/globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Skill Swap",
  description: "Barter your skills, not your wallet.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-white`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
