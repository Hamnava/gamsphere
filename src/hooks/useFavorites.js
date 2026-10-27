


import { useEffect, useState } from "react";

const STORAGE_KEY = "gamesphere-favorites";

function readFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed.filter((id) => Number.isInteger(id))
      : [];
  } catch {
    return [];
  }
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error("Could not save favorites:", error);
    }
  }, [favorites]);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  }

  return {
    favorites,
    toggleFavorite,
  };
}
