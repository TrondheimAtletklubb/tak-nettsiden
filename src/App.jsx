import "./styles/main.scss";
import "./styles/App.scss";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Benefits from "./components/benefits/Benefits";
import Location from "./components/location/Location";
import Pricing from "./components/pricing/Pricing";
import Contact from "./components/contact/Contact";
import BackToTop from "./components/backToTop/BackToTop";
import NvfLogo from "./components/nvfLogo/NvfLogo";

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Benefits />
      <Location />
      <Pricing />
      <Contact />
      <BackToTop />
      <NvfLogo />
    </div>
  );
}

export default App;
