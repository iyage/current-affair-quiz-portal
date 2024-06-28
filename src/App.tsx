import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import QuizPage from "./pages/quiz-page/QuizPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quiz-page" element={<QuizPage />} />
      </Routes>
    </>
  );
}

export default App;
