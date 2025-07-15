import "./styles/main.scss";
import "./styles/App.scss";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Benefits from "./components/benefits/Benefits";
import Location from "./components/location/Location";
import ThemeToggle from "./components/themeToggle/ThemeToggle";
import BackToTop from "./components/backToTop/BackToTop";
import NvfLogo from "./components/nvfLogo/NvfLogo";

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Benefits />
      <Location />
      <ThemeToggle />
      <BackToTop />
      <NvfLogo />
    </div>
  );
}

export default App;
