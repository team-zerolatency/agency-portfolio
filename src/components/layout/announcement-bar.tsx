"use client";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { X } from "lucide-react";

const listeners = new Set<() => void>();
const dismissedInMemory = new Set<string>(); // fallback when storage is blocked (private mode)

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};

const storageKey = (id: string) => `announcement:${id}`;

function isDismissed(id: string): boolean {
  if (dismissedInMemory.has(id)) return true;
  try {
    return localStorage.getItem(storageKey(id)) === "1";
  } catch {
    return false;
  }
}

function dismiss(id: string) {
  dismissedInMemory.add(id);
  try {
    localStorage.setItem(storageKey(id), "1");
  } catch {
    // storage blocked: the in-memory flag still hides it for this visit
  }
  listeners.forEach((l) => l());
}

interface AnnouncementBarProps {
  id: string;
  message: string;
  cta: { label: string; href: string };
}

export function AnnouncementBar({ id, message, cta }: AnnouncementBarProps) {
  // Server snapshot is `true` (hidden), so the bar never flashes for people who already dismissed it.
  const dismissed = useSyncExternalStore(
    subscribe,
    () => isDismissed(id),
    () => true,
  );
  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-xl items-center gap-3 rounded-full py-2 pr-2 pl-5 text-sm glass"
    >
      <p className="flex-1 text-fg-muted">{message}</p>
      <Link href={cta.href} className="font-medium whitespace-nowrap text-accent hover:underline">
        {cta.label}
      </Link>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => dismiss(id)}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full transition hover:bg-bg-elevated"
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}
