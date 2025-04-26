import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

/* PAGE IMPORTS */
import Landing from "./layouts/landing";
import GenerateLessons from "@/layouts/generate-lessons";
import TopicPage from "@/layouts/topic-page";
import LessonPage from "@/layouts/lesson-page";
import AllTopicsPage from "@/layouts/all-topics-page";
import Dashboard from "./layouts/dashboard";
import FeedbackPage from "./layouts/feedback-page";
import { LogoutPage } from "./layouts/logout-page";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route element={<Dashboard />}>
            <Route
              path="/generate-lessons"
              element={<GenerateLessons />}
            />
            <Route path="/topic/:id" element={<TopicPage />} />
            <Route path="/topic/:id/:order" element={<LessonPage />} />
            <Route path="/all-topics/" element={<AllTopicsPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
