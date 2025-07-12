"use client";

import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface SkillInputProps {
  placeholder: string;
  onAdd: (skill: string) => void;
}

export default function SkillInput({ placeholder, onAdd }: SkillInputProps) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onAdd(trimmed);
      setValue("");
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button onClick={handleAdd}>Add</Button>
    </div>
  );
}
