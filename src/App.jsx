import "./styles/main.scss";
import styles from "./styles/App.module.scss";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import SportOverview from "./components/sportOverview/SportOverview";
import Lifts from "./components/lifts/Lifts";
import Benefits from "./components/benefits/Benefits";
import Location from "./components/location/Location";
import Pricing from "./components/pricing/Pricing";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import BackToTop from "./components/backToTop/BackToTop";
import NvfLogo from "./components/nvfLogo/NvfLogo";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Hero />
      <SportOverview />
      <Lifts />
      <Benefits />
      <Location />
      <Pricing />
      <Contact />
      <Footer />
      <BackToTop />
      <NvfLogo />
    </div>
  );
}

export default App;
