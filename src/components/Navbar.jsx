


import { Gamepad2, Search, Heart, Menu, X } from "lucide-react";

export default function Navbar({
  search,
  setSearch,
  favoritesCount,
  menuOpen,
  setMenuOpen,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0d14]/90 backdrop-blur-xl">
      <div className="flex h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex shrink-0 items-center gap-3">
          <div className="rounded-xl bg-violet-600 p-2.5 shadow-lg shadow-violet-600/20">
            <Gamepad2 size={25} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white">
              Game<span className="text-violet-400">Sphere</span>
            </h1>
            <p className="hidden text-[10px] tracking-[0.2em] text-gray-500 sm:block">
              PLAY BEYOND LIMITS
            </p>
          </div>
        </a>

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search games..."
            aria-label="Search games"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-xl border border-white/10 p-2.5 text-gray-300 md:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <div className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2 sm:flex">
            <Heart size={18} className="text-violet-400" />
            <span className="text-sm text-gray-300">
              Favorites
            </span>
            <span className="rounded-md bg-violet-500/20 px-2 py-0.5 text-xs text-violet-300">
              {favoritesCount}
            </span>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 font-bold text-violet-300">
            G
          </div>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search games..."
            aria-label="Search games"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-3 text-sm text-white outline-none focus:border-violet-500"
          />
        </div>
      </div>
    </header>
  );
}
