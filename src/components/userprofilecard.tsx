"use client";

import React from "react";
import Link from "next/link";
import SkillTag from "./skillTags";
import { Card, CardContent } from "./ui/card";
import { Button } from "@/components/ui/button";

interface UserProfileCardProps {
  id: string;
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string;
}

export default function UserProfileCard({
  id,
  name,
  skillsOffered,
  skillsWanted,
  availability,
}: UserProfileCardProps) {
  return (
    <Card className="bg-gray-900 text-white shadow-md">
      <CardContent className="p-5 space-y-3">
        <h3 className="text-xl font-semibold">{name}</h3>

        <div>
          <p className="text-sm text-gray-400 mb-1">Offers:</p>
          <div className="flex flex-wrap gap-2">
            {skillsOffered.map((skill, idx) => (
              <SkillTag key={idx} text={skill} color="indigo" />
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 mt-3 mb-1">Wants:</p>
          <div className="flex flex-wrap gap-2">
            {skillsWanted.map((skill, idx) => (
              <SkillTag key={idx} text={skill} color="pink" />
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-300 mt-2">📆 {availability}</div>

        <Link href={`/profile/${id}`}>
          <Button className="mt-4 w-full">
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
