"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import SkillTag from "./skillTags";

type SwapStatus = "pending" | "accepted" | "rejected";

interface SwapRequestCardProps {
  id: string;
  userName: string;
  offeredSkills: string[];
  wantedSkills: string[];
  status: SwapStatus;
  isIncoming: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
}

export default function SwapRequestCard({
  userName,
  offeredSkills,
  wantedSkills,
  status,
  isIncoming,
  onAccept,
  onReject,
  onCancel,
}: SwapRequestCardProps) {
  const statusColors = {
    pending: "text-yellow-400",
    accepted: "text-green-400",
    rejected: "text-red-400",
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg p-5 shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">
          {isIncoming ? `${userName} wants to swap with you` : `You sent a request to ${userName}`}
        </h3>
        <span className={`text-sm font-medium ${statusColors[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>

      <div className="text-sm mb-2 text-gray-300">They offer:</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {offeredSkills.map((skill, idx) => (
          <SkillTag key={idx} text={skill} color="indigo" />
        ))}
      </div>

      <div className="text-sm mb-2 text-gray-300">They want:</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {wantedSkills.map((skill, idx) => (
          <SkillTag key={idx} text={skill} color="pink" />
        ))}
      </div>

      {status === "pending" && (
        <div className="flex gap-3">
          {isIncoming ? (
            <>
              <Button onClick={onAccept} className="bg-green-600">
                Accept
              </Button>
              <Button onClick={onReject} variant="outline">
                Reject
              </Button>
            </>
          ) : (
            <Button onClick={onCancel} variant="outline" className="border-red-500 text-red-400">
              Cancel
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
