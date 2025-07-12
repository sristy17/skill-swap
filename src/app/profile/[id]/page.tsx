"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import SkillTag from "@/components/skillTags";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Mock user database
const mockUserDB: Record<
  string,
  {
    name: string;
    skillsOffered: string[];
    skillsWanted: string[];
    availability: string;
    isPublic: boolean;
    message: string;
  }
> = {
  "u001": {
    name: "Ananya Roy",
    skillsOffered: ["Figma", "Graphic Design"],
    skillsWanted: ["Public Speaking", "Excel"],
    availability: "Weekends",
    isPublic: true,
    message: "Hey there! I'm excited to share my design skills and hoping to level up my speaking confidence."
  },
  "u002": {
    name: "Dev Mehta",
    skillsOffered: ["React", "TypeScript"],
    skillsWanted: ["Leadership", "UI/UX"],
    availability: "Evenings",
    isPublic: true,
    message: "Frontend enthusiast. Always happy to mentor and exchange ideas."
  },
};

export default function ProfilePage() {
  const params = useParams();
  const id = params?.id as string;
  const [requestSent, setRequestSent] = useState(false);

  const user = mockUserDB[id];

  if (!user || !user.isPublic) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
        <p className="text-gray-400">This profile is private or does not exist.</p>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">👤 {user.name}</h1>

      <div className="mb-6 text-sm text-gray-300">
        <p>📅 Availability: {user.availability}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Message / Bio</h2>
        <p className="text-gray-300 text-sm bg-gray-800 p-4 rounded-lg">{user.message}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Skills Offered</h2>
        <div className="flex flex-wrap gap-2">
          {user.skillsOffered.map((skill, idx) => (
            <SkillTag key={idx} text={skill} color="indigo" />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Skills Wanted</h2>
        <div className="flex flex-wrap gap-2">
          {user.skillsWanted.map((skill, idx) => (
            <SkillTag key={idx} text={skill} color="pink" />
          ))}
        </div>
      </div>

      {requestSent ? (
        <p className="text-green-400 text-sm mt-4">✅ Swap request sent!</p>
      ) : (
        <Button className="bg-green-600 w-full mt-4" onClick={() => setRequestSent(true)}>
          Send Swap Request
        </Button>
      )}
    </section>
  );
}
