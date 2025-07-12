"use client";

import React from "react";

export default function SkillTag({ text, color = "indigo" }: { text: string; color?: string }) {
  const bg = {
    indigo: "bg-indigo-600",
    pink: "bg-pink-600",
    green: "bg-green-600",
    gray: "bg-gray-600",
  }[color];

  return (
    <span className={`text-sm px-3 py-1 rounded-full ${bg} text-white`}>{text}</span>
  );
}