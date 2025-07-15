import "./styles/main.scss";
import "./styles/App.scss";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import ThemeToggle from "./components/themeToggle/ThemeToggle";

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <ThemeToggle />
    </div>
  );
}

export default App;
