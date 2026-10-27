
import { useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import GameCard from "../components/GameCard";
import { games, categories } from "../data/games";
import useFavorites from "../hooks/useFavorites";

import {
  ArrowRight,
  Gamepad2,
  Play,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

function HomePage(){
   const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Games");
  const { favorites, toggleFavorite } = useFavorites();
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        activeCategory === "All Games" ||
        game.category === activeCategory;

      const matchesFavorites =
        !favoritesOnly || favorites.includes(game.id);

      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [search, activeCategory, favorites, favoritesOnly]);

  const featuredGame = games[0];

  return (
    <div className="min-h-screen bg-[#0b0d14] text-white">
      <Navbar
        search={search}
        setSearch={setSearch}
        favoritesCount={favorites.length}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <div className="mx-auto flex max-w-[1800px]">
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          favoritesOnly={favoritesOnly}
          setFavoritesOnly={setFavoritesOnly}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-8 flex items-center gap-2 text-xs text-gray-500">
            <Gamepad2 size={15} className="text-violet-400" />
            <span>GameSphere</span>
            <span>/</span>
            <span className="text-gray-300">
              {favoritesOnly ? "Favorites" : activeCategory}
            </span>
          </div>

          {!search && !favoritesOnly &&
            activeCategory === "All Games" && (
            <section className="relative mb-12 overflow-hidden rounded-3xl border border-violet-400/20 bg-[#171426]">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-950/80 via-[#171426]/80 to-transparent" />

              <div className="relative grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-12">
                <div className="relative z-10">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-300">
                    <Sparkles size={14} />
                    YOUR NEXT ADVENTURE
                  </div>

                  <h2 className="max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl xl:text-6xl">
                    Ready.
                    <br />
                    Player.
                    <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                      {" "}One.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
                    Discover new worlds, challenge yourself, and
                    find your next favorite game.
                  </p>

                  <button
                    onClick={() =>
                      document.getElementById("game-library")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-violet-900/30 transition hover:bg-violet-500"
                  >
                    <Play size={17} fill="currentColor" />
                    Explore Games
                    <ArrowRight size={16} />
                  </button>

                  <div className="mt-8 flex gap-6 text-xs text-gray-400">
                    <span>
                      <strong className="text-white">{games.length}</strong>
                      {" "}sample games
                    </span>
                    <span>
                      <strong className="text-white">4</strong>
                      {" "}categories
                    </span>
                  </div>
                </div>

                <div className="relative hidden lg:block">
                  <img
                    src={featuredGame.image}
                    alt="Featured game artwork"
                    className="h-72 w-full rounded-2xl object-cover shadow-2xl shadow-violet-950/40 xl:h-80"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <p className="text-xs text-violet-300">
                      FEATURED GAME
                    </p>
                    <h3 className="mt-1 text-2xl font-bold">
                      {featuredGame.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-300">
                      {featuredGame.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section id="game-library" className="scroll-mt-28">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2 text-violet-400">
                  {favoritesOnly ? (
                    <Gamepad2 size={18} />
                  ) : (
                    <TrendingUp size={18} />
                  )}
                  <span className="text-xs font-bold uppercase tracking-[0.15em]">
                    {favoritesOnly ? "Your collection" : "Discover"}
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {favoritesOnly
                    ? "Your Favorites"
                    : search
                      ? "Search Results"
                      : activeCategory === "All Games"
                        ? "Explore Games"
                        : activeCategory + " Games"}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {filteredGames.length} games found
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setFavoritesOnly(false);
                    }}
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                      activeCategory === category && !favoritesOnly
                        ? "border-violet-500/40 bg-violet-500/15 text-violet-300"
                        : "border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    isFavorite={favorites.includes(game.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 text-center">
                <div className="mb-4 rounded-2xl bg-violet-500/10 p-4">
                  <Search size={28} className="text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold">
                  No games found
                </h3>
                <p className="mt-2 max-w-sm text-sm text-gray-500">
                  Try another search or category, or explore all games.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All Games");
                    setFavoritesOnly(false);
                  }}
                  className="mt-5 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium hover:bg-violet-500"
                >
                  Show all games
                </button>
              </div>
            )}
          </section>

          <footer className="mt-16 border-t border-white/[0.08] py-6 text-center text-xs text-gray-600">
            © 2026 GameSphere. Built with React and Tailwind CSS.
          </footer>
        </main>
      </div>
    </div>
  );
}


export default HomePage