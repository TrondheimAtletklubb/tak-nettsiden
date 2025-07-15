import "./styles/main.scss";
import "./styles/App.scss";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Benefits from "./components/benefits/Benefits";
import Location from "./components/location/Location";
import ThemeToggle from "./components/themeToggle/ThemeToggle";
import BackToTop from "./components/backToTop/BackToTop";

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Benefits />
      <Location />
      <ThemeToggle />
      <BackToTop />
    </div>
  );
}

export default App;
