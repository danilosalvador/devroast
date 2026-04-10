import * as React from "react";
import { HomePage } from "./components/HomePage";
import { LeaderboardPage } from "./components/LeaderboardPage";
import { Navbar } from "./components/Navbar";
import { ResultsPage } from "./components/ResultsPage";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<"home" | "leaderboard" | "results">("home");
  const [resultId, setResultId] = React.useState<string | undefined>();

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#leaderboard") {
        setCurrentPage("leaderboard");
        setResultId(undefined);
      } else if (hash.startsWith("#results/")) {
        const id = hash.replace("#results/", "");
        setResultId(id);
        setCurrentPage("results");
      } else {
        setCurrentPage("home");
        setResultId(undefined);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-bg-page">
      <Navbar />
      {currentPage === "home" && <HomePage />}
      {currentPage === "leaderboard" && <LeaderboardPage />}
      {currentPage === "results" && <ResultsPage id={resultId} />}
    </div>
  );
}
