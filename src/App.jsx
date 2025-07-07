import "./styles/main.scss";
import "./styles/App.scss";
import Header from "./components/header/Header";
import ThemeToggle from "./components/themeToggle/ThemeToggle";

function App() {
  return (
    <div className="app">
      <Header />
      <ThemeToggle />
    </div>
  );
}

export default App;
