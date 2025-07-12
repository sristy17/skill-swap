"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SkillTag from "@/components/skillTags";

const skillsList = [
  "Photoshop",
  "Excel",
  "Web Dev",
  "Public Speaking",
  "Design",
  "AI",
  "Figma",
];

export default function Home() {
  return (
    <section className="min-h-screen px-6 py-16 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Barter Your Skills, Not Your Wallet 💡</h1>
      <p className="text-lg text-gray-400 mb-6">
        Discover people around you who can teach you something new — and who want to learn what you know.
      </p>

      <div className="flex justify-center gap-4 mb-12">
        <Link href="/dashboard">
          <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
        </Link>
        <Link href="/explore">
          <Button variant="outline">Browse Swappers</Button>
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Popular Skills</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {skillsList.map((skill, idx) => (
            <SkillTag key={idx} text={skill} color="green" />
          ))}
        </div>
      </div>
    </section>
  );
}
