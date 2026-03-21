"use client";

import { useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";

interface FavoriteButtonProps {
  itemId: string;
  itemLabel?: string;
  size?: "sm" | "md";
  onToggle?: (isFavorite: boolean) => void;
}

const STORAGE_KEY = "repodoc-favorites";

export function getFavorites(): Record<string, { label: string; addedAt: number }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function getFavoritesCount(): number {
  return Object.keys(getFavorites()).length;
}

export default function FavoriteButton({ itemId, itemLabel, size = "md", onToggle }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const favs = getFavorites();
    setIsFavorite(!!favs[itemId]);
  }, [itemId]);

  const toggle = useCallback(() => {
    const favs = getFavorites();
    const newState = !isFavorite;

    if (newState) {
      favs[itemId] = { label: itemLabel || itemId, addedAt: Date.now() };
    } else {
      delete favs[itemId];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    setIsFavorite(newState);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);

    window.dispatchEvent(new CustomEvent("favorites-changed"));
    onToggle?.(newState);
  }, [isFavorite, itemId, itemLabel, onToggle]);

  const sizeClasses = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
      className={`group relative p-1.5 rounded-lg transition-all duration-200 hover:bg-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 ${
        animating ? "scale-125" : "scale-100"
      }`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={`${sizeClasses} transition-all duration-300 ${
          isFavorite
            ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
            : "text-[var(--color-text-secondary)] group-hover:text-amber-400/60"
        }`}
      />
    </button>
  );
}
