"use client";

import React from "react";
import SkillInput from "./skillInput";
import SkillTag from "./skillTags";

interface SkillSectionProps {
  title: string;
  placeholder: string;
  skills: string[];
  onAddSkill: (skill: string) => void;
  tagColor?: "indigo" | "pink" | "green" | "gray";
}

export default function SkillSection({
  title,
  placeholder,
  skills,
  onAddSkill,
  tagColor = "indigo",
}: SkillSectionProps) {
  return (
    <section className="bg-gray-900 p-6 rounded-xl mb-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <SkillInput placeholder={placeholder} onAdd={onAddSkill} />
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill, idx) => (
          <SkillTag key={idx} text={skill} color={tagColor} />
        ))}
      </div>
    </section>
  );
}
