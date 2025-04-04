import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";

/* PAGE IMPORTS */
import Landing from "./layouts/landing";
import GenerateLessons from "./layouts/generate-lessons";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/generate-lessons" element={<GenerateLessons />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
