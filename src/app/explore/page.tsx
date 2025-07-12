"use client";

import React, { useState } from "react";
import UserProfileCard from "@/components/userprofilecard";

type User = {
  id: string;
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string;
};

const mockUsers: User[] = [
  {
    id: "u001",
    name: "Ananya Roy",
    skillsOffered: ["Graphic Design", "Figma"],
    skillsWanted: ["Public Speaking", "Excel"],
    availability: "Weekends",
  },
  {
    id: "u002",
    name: "Dev Mehta",
    skillsOffered: ["React", "TypeScript"],
    skillsWanted: ["UI/UX", "Leadership"],
    availability: "Evenings",
  },
  {
    id: "u003",
    name: "Sara Khan",
    skillsOffered: ["Photography", "Video Editing"],
    skillsWanted: ["Guitar", "Blog Writing"],
    availability: "Anytime",
  },
];

export default function ExplorePage() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">🌐 Explore Swappers</h1>
      <p className="text-gray-400 mb-6 text-sm">
        Browse through users who are publicly offering and requesting skills. Click on a profile to view more.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {users.map((user) => (
          <UserProfileCard
            key={user.id}
            id={user.id}
            name={user.name}
            skillsOffered={user.skillsOffered}
            skillsWanted={user.skillsWanted}
            availability={user.availability}
          />
        ))}
      </div>
    </section>
  );
}
