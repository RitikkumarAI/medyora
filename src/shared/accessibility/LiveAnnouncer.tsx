import { useState, useEffect } from "react";

type Politeness = "polite" | "assertive";

interface Announcement {
  id: number;
  message: string;
  politeness: Politeness;
}

let counter = 0;
const listeners = new Set<(announcement: Announcement) => void>();

export function announce(message: string, politeness: Politeness = "polite") {
  const item: Announcement = {
    id: ++counter,
    message,
    politeness,
  };
  listeners.forEach((listener) => listener(item));
}

export function LiveAnnouncer() {
  const [politeMessage, setPoliteMessage] = useState("");
  const [assertiveMessage, setAssertiveMessage] = useState("");

  useEffect(() => {
    const handleAnnouncement = (announcement: Announcement) => {
      if (announcement.politeness === "assertive") {
        setAssertiveMessage(announcement.message);
      } else {
        setPoliteMessage(announcement.message);
      }
    };

    listeners.add(handleAnnouncement);
    return () => {
      listeners.delete(handleAnnouncement);
    };
  }, []);

  return (
    <div className="sr-only">
      <div role="status" aria-live="polite" aria-atomic="true">
        {politeMessage}
      </div>
      <div role="alert" aria-live="assertive" aria-atomic="true">
        {assertiveMessage}
      </div>
    </div>
  );
}
