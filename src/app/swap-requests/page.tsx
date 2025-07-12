"use client";

import React, { useState } from "react";
import SwapRequestCard from "@/components/swaprequestcard";

type SwapRequest = {
  id: string;
  userName: string;
  offeredSkills: string[];
  wantedSkills: string[];
  status: "pending" | "accepted" | "rejected";
  isIncoming: boolean;
};

const mockRequests: SwapRequest[] = [
  {
    id: "sr-001",
    userName: "Aman Verma",
    offeredSkills: ["UI Design", "Canva"],
    wantedSkills: ["Guitar", "Storytelling"],
    status: "pending",
    isIncoming: true,
  },
  {
    id: "sr-002",
    userName: "Nisha Dey",
    offeredSkills: ["Node.js", "MongoDB"],
    wantedSkills: ["Figma", "Excel"],
    status: "pending",
    isIncoming: false,
  },
];

export default function SwapRequestsPage() {
  const [requests, setRequests] = useState<SwapRequest[]>(mockRequests);

  const handleUpdateStatus = (id: string, newStatus: "accepted" | "rejected") => {
    setRequests((prev) =>
      prev.map((req) => req.id === id ? { ...req, status: newStatus } : req)
    );
  };

  const handleCancel = (id: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">📨 Swap Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-400">No swap requests at the moment.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <SwapRequestCard
              key={req.id}
              id={req.id}
              userName={req.userName}
              offeredSkills={req.offeredSkills}
              wantedSkills={req.wantedSkills}
              status={req.status}
              isIncoming={req.isIncoming}
              onAccept={
                req.isIncoming && req.status === "pending"
                  ? () => handleUpdateStatus(req.id, "accepted")
                  : undefined
              }
              onReject={
                req.isIncoming && req.status === "pending"
                  ? () => handleUpdateStatus(req.id, "rejected")
                  : undefined
              }
              onCancel={
                !req.isIncoming && req.status === "pending"
                  ? () => handleCancel(req.id)
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
