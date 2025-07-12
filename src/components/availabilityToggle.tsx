"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface AvailabilityToggleProps {
  availability: string;
  onChangeAvailability: (value: string) => void;
  isPublic: boolean;
  onTogglePublic: () => void;
}

export default function AvailabilityToggle({
  availability,
  onChangeAvailability,
  isPublic,
  onTogglePublic,
}: AvailabilityToggleProps) {
  return (
    <section className="bg-gray-900 p-6 rounded-xl shadow-lg mb-6 space-y-4">
      <h2 className="text-xl font-semibold">Availability</h2>

      <Input
        value={availability}
        onChange={(e) => onChangeAvailability(e.target.value)}
        placeholder="e.g. Weekends, Evenings"
        className="w-full"
      />

      <div className="flex items-center gap-4 mt-2">
        <label className="text-sm">Public Profile:</label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={onTogglePublic}
          className="accent-indigo-500 scale-125"
        />
        <span className="text-sm text-gray-400">
          ({isPublic ? "Visible to others" : "Hidden"})
        </span>
      </div>
    </section>
  );
}
