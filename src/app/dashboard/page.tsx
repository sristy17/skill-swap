"use client";

import React, { useState } from "react";
import SkillSection from "@/components/skillSection";
import AvailabilityToggle from "@/components/availabilityToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const [skillsOffered, setSkillsOffered] = useState<string[]>(["Web Dev", "Figma"]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>(["Public Speaking"]);
  const [availability, setAvailability] = useState("Weekends");
  const [isPublic, setIsPublic] = useState(true);

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">📋 My Dashboard</h1>

      <SkillSection
        title="Skills I Offer"
        placeholder="e.g. UI Design"
        skills={skillsOffered}
        onAddSkill={(skill) => setSkillsOffered([...skillsOffered, skill])}
        tagColor="indigo"
      />

      <SkillSection
        title="Skills I Want"
        placeholder="e.g. Leadership Training"
        skills={skillsWanted}
        onAddSkill={(skill) => setSkillsWanted([...skillsWanted, skill])}
        tagColor="pink"
      />

      <AvailabilityToggle
        availability={availability}
        onChangeAvailability={setAvailability}
        isPublic={isPublic}
        onTogglePublic={() => setIsPublic(!isPublic)}
      />

      <div className="text-center mt-8">
        <Link href="/swap-requests">
          <Button className="bg-green-600">View My Swap Requests</Button>
        </Link>
      </div>
    </section>
  );
}
