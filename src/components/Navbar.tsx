export function Navbar() {
  return (
    <header className="flex h-14 w-full items-center justify-between border-border-primary border-b bg-bg-page px-10">
      <a href="#" className="flex items-center gap-2 transition-opacity hover:opacity-80">
        <span className="font-bold font-primary text-[20px] text-accent-green">
          {">"}
        </span>
        <span className="font-medium font-primary text-[18px] text-text-primary">
          devroast
        </span>
      </a>

      <nav className="flex items-center gap-6">
        <a
          href="#leaderboard"
          className="font-primary text-[13px] text-text-secondary transition-colors hover:text-text-primary"
        >
          leaderboard
        </a>
      </nav>
    </header>
  );
}
