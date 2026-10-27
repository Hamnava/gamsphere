


import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Star,
  Users,
  Gamepad2,
} from "lucide-react";

import { games } from "../data/games";
import useFavorites from "../hooks/useFavorites";

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const game = games.find((item) => item.id === Number(id));

  const { favorites, toggleFavorite } = useFavorites();

  if (!game) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0b0d14] px-5 text-white">
        <Gamepad2 size={48} className="mb-4 text-violet-400" />

        <h1 className="text-2xl font-bold">Game not found</h1>

        <p className="mt-2 text-gray-400">
          This game doesn't exist in our catalogue.
        </p>

        <Link
          to="/"
          className="mt-6 rounded-xl bg-violet-600 px-5 py-3 font-medium hover:bg-violet-500"
        >
          Return Home
        </Link>
      </main>
    );
  }

  const isFavorite = favorites.includes(game.id);

  return (
    <main className="min-h-screen bg-[#0b0d14] text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-10">
        <Link to="/" className="text-xl font-black">
          Game<span className="text-violet-400">Sphere</span>
        </Link>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-10 sm:py-12">
        <p className="mb-5 text-sm text-gray-500">
          <Link to="/" className="hover:text-violet-400">
            Home
          </Link>
          {" / "}
          {game.title}
        </p>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src={game.image}
              alt={game.title}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <section>
            <span className="inline-block rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300">
              {game.category}
            </span>

            <h1 className="mt-5 text-4xl font-black sm:text-5xl">
              {game.title}
            </h1>

            <p className="mt-5 leading-7 text-gray-400">
              {game.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Star size={17} className="text-amber-400" />
                {game.rating} rating
              </span>

              <span className="flex items-center gap-2">
                <Users size={17} className="text-violet-400" />
                {game.players} players
              </span>
            </div>

            <button
              onClick={() => toggleFavorite(game.id)}
              aria-pressed={isFavorite}
              className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 font-semibold transition sm:w-auto ${
                isFavorite
                  ? "border-violet-400/40 bg-violet-500/15 text-violet-300"
                  : "border-white/10 bg-white/[0.04] hover:bg-white/10"
              }`}
            >
              <Heart
                size={18}
                fill={isFavorite ? "currentColor" : "none"}
              />
              {isFavorite
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="font-bold">Ready to play?</h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                We're preparing playable browser games for
                GameSphere. This catalogue entry isn't connected
                to a playable game yet.
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-4 text-sm font-medium text-violet-400 hover:text-violet-300"
              >
                Explore other games →
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
