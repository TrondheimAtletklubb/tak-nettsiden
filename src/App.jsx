import "./styles/main.scss";
import "./styles/App.scss";
import logo from "./assets/logo-tak-transparent.png";
import ThemeToggle from "./components/themeToggle/ThemeToggle";

function App() {
  return (
    <div className="app">
      <ThemeToggle />
      <img src={logo} alt="TAK Logo" className="logo" />
    </div>
  );
}

export default App;
