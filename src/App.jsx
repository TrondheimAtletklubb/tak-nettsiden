import "./styles/main.scss";
import "./styles/App.scss";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Benefits from "./components/benefits/Benefits";
import Location from "./components/location/Location";
import ThemeToggle from "./components/themeToggle/ThemeToggle";

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Benefits />
      <Location />
      <ThemeToggle />
    </div>
  );
}

export default App;
