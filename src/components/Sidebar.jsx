


import {
  Compass,
  Gamepad2,
  Heart,
  Zap,
  Mountain,
  Car,
  Puzzle,
  Sparkles,
} from "lucide-react";

const iconMap = {
  "All Games": Compass,
  Favorites: Heart,
  Action: Zap,
  Adventure: Mountain,
  Racing: Car,
  Puzzle: Puzzle,
};

export default function Sidebar({
  categories,
  activeCategory,
  setActiveCategory,
  favoritesOnly,
  setFavoritesOnly,
  menuOpen,
  setMenuOpen,
}) {
  function selectCategory(category) {
    setActiveCategory(category);
    setFavoritesOnly(false);
    setMenuOpen(false);
  }

  function selectFavorites() {
    setFavoritesOnly(true);
    setMenuOpen(false);
  }

  return (
    <>
      {menuOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-[125px] z-50 w-64 overflow-y-auto border-r border-white/10 bg-[#0b0d14] p-5 transition-transform duration-300 md:sticky md:top-[76px] md:z-10 md:h-[calc(100vh-76px)] md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <p className="mb-4 px-3 text-[10px] font-bold tracking-[0.2em] text-gray-500">
          DISCOVER
        </p>

        <nav className="space-y-1">
          {categories.map((category) => {
            const Icon = iconMap[category] || Gamepad2;
            const active =
              activeCategory === category && !favoritesOnly;

            return (
              <button
                key={category}
                onClick={() => selectCategory(category)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                  active
                    ? "bg-violet-500/15 font-semibold text-violet-300"
                    : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Icon size={19} />
                <span>{category}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
                )}
              </button>
            );
          })}

          <div className="my-5 border-t border-white/10" />

          <button
            onClick={selectFavorites}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
              favoritesOnly
                ? "bg-violet-500/15 font-semibold text-violet-300"
                : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            <Heart size={19} />
            Favorites
          </button>
        </nav>

        <div className="mt-10 rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/10 to-transparent p-4">
          <Sparkles size={22} className="mb-3 text-violet-400" />
          <h3 className="text-sm font-semibold text-white">
            Level up your fun
          </h3>
          <p className="mt-2 text-xs leading-5 text-gray-400">
            Discover your next favorite game and build your collection.
          </p>
        </div>
      </aside>
    </>
  );
}
