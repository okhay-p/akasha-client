import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

/* PAGE IMPORTS */
import Landing from "./layouts/landing";
import GenerateLessons from "./layouts/generate-lessons";
import ProtectedRoute from "./components/protected-route";
import TopicPage from "./layouts/topic-page";
import LessonPage from "./layouts/lesson-page";
import AllTopicsPage from "./layouts/all-topics-page";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/generate-lessons"
            element={
              <ProtectedRoute>
                <GenerateLessons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/topic/:id"
            element={
              <ProtectedRoute>
                <TopicPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/topic/:id/:order"
            element={
              <ProtectedRoute>
                <LessonPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-topics/"
            element={
              <ProtectedRoute>
                <AllTopicsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
