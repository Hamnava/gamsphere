
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GameDetails from "./pages/GameDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/games/:id"
          element={<GameDetails />}
        />

        <Route
          path="*"
          element={
            <main className="flex min-h-screen items-center justify-center bg-[#0b0d14] text-white">
              <div className="text-center">
                <h1 className="text-3xl font-bold">
                  404 — Page Not Found
                </h1>

                <a
                  href="/"
                  className="mt-4 inline-block text-violet-400 hover:text-violet-300"
                >
                  Return Home
                </a>
              </div>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
