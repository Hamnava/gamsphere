

import { useNavigate } from "react-router-dom";
import { Heart, Star, Users, Play } from "lucide-react";

export default function GameCard({ game, isFavorite, onToggleFavorite }) {

  const navigate = useNavigate();

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12141f] transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-xl hover:shadow-violet-950/20">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        <span className="absolute left-3 top-3 rounded-lg border border-white/10 bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur">
          {game.category}
        </span>

        <button
          onClick={() => onToggleFavorite(game.id)}
          aria-label={
            isFavorite
              ? `Remove ${game.title} from favorites`
              : `Add ${game.title} to favorites`
          }
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 rounded-full p-2 transition ${
            isFavorite
              ? "bg-violet-600 text-white"
              : "bg-black/50 text-white hover:bg-violet-600"
          }`}
        >
          <Heart
            size={17}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white">
          <Users size={14} className="text-violet-300" />
          {game.players} players
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-white transition group-hover:text-violet-300">
            {game.title}
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-xs text-amber-300">
            <Star size={13} fill="currentColor" />
            {game.rating}
          </span>
        </div>

        <p className="mt-2 text-xs leading-5 text-gray-500">
          {game.description}
        </p>

        
        <button
          onClick={() => navigate(`/games/${game.id}`)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          <Play size={15} />
          View Details
        </button>

      </div>
    </article>
  );
}
