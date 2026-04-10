import * as React from "react";
import { HomePage } from "./components/HomePage";
import { LeaderboardPage } from "./components/LeaderboardPage";
import { Navbar } from "./components/Navbar";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<"home" | "leaderboard">("home");

  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#leaderboard") {
        setCurrentPage("leaderboard");
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-bg-page">
      <Navbar />
      {currentPage === "home" ? <HomePage /> : <LeaderboardPage />}
    </div>
  );
}
