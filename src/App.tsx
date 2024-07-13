import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import QuizPage from "./pages/quiz-page/QuizPage";
import Page from "./pages/page/Page";
import Quizs from "./pages/quizs/Quizs";
import Quiz from "./pages/quiz/Quiz";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pages" element={<Page />}>
          <Route index element={<QuizPage />} />
          <Route path="/pages/quizs" element={<Quizs />} />
          <Route path="/pages/quiz/:id" element={<Quiz />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
