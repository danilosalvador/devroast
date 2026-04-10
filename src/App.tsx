import { HomePage } from "./components/HomePage";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-page">
      <Navbar />
      <HomePage />
    </div>
  );
}
