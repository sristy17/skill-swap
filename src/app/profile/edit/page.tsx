"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SkillSection from "@/components/skillSection";
import AvailabilityToggle from "@/components/availabilityToggle";
import { Button } from "@/components/ui/button";

export default function EditProfilePage() {
  const [name, setName] = useState("Sristy");
  const [bio, setBio] = useState("Excited to swap skills and learn from others!");
  const [skillsOffered, setSkillsOffered] = useState<string[]>(["Figma"]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>(["Public Speaking"]);
  const [availability, setAvailability] = useState("Weekends");
  const [isPublic, setIsPublic] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Ideally post to Supabase here
    console.log("Saved profile", {
      name,
      bio,
      skillsOffered,
      skillsWanted,
      availability,
      isPublic,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">🛠️ Edit My Profile</h1>

      <div className="space-y-4">
        <Input
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Textarea
          placeholder="Short bio or message to others"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <SkillSection
          title="Skills I Offer"
          placeholder="e.g. UI Design"
          skills={skillsOffered}
          onAddSkill={(skill) => setSkillsOffered([...skillsOffered, skill])}
          tagColor="indigo"
        />

        <SkillSection
          title="Skills I Want"
          placeholder="e.g. Leadership"
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

        <Button onClick={handleSave} className="bg-indigo-600 w-full mt-4">
          Save Profile
        </Button>
        {saved && <p className="text-green-400 text-sm mt-2">✅ Profile saved!</p>}
      </div>
    </section>
  );
}
