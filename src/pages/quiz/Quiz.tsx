/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QUIZ, UserInfoStore } from "../../utils/store";
import "./quiz.css";
import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { QuesDto, updateQuestion } from "../../utils/api";
function Quiz() {
  const params = useParams();
  const [quiz, setQuiz] = useState<QUIZ | undefined>(undefined);
  const [id, setId] = useState<any>("");
  const [opt, setOpt] = useState<any>(null);
  const quizs = UserInfoStore.useState((s) => s.quizs);
  const token = UserInfoStore.useState((s) => s.token);

  useEffect(() => {
    setId(params.id);
    const fetchQuiz = quizs.find((quiz) => {
      return quiz.id === params.id;
    });
    setOpt(fetchQuiz?.data.answer);
    setQuiz(fetchQuiz);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(e: any): void {
    e.preventDefault();
    const options = [];
    let answer;
    for (let index = 0; index < e.target["option"].length; index++) {
      options.push(e.target["option"][index].value);
    }

    for (let index = 0; index < e.target["answer"].length; index++) {
      if (e.target["answer"][index].checked === true) answer = index + 1;
    }

    const payload = {
      question: e.target["question"].value,
      options,
      answer: answer,
      category: e.target["category"].value,
    };
    console.log(payload);
    mutate(payload);
  }

  const { mutate } = useMutation(
    (variables: QuesDto) => updateQuestion(variables, token, id),
    {
      onSuccess: (data: AxiosResponse) => {
        console.log(data);
        alert("Question added successfully");
      },
      onError: (err: AxiosError) => {
        alert("Error! Try again......");
        console.log(err);
      },
    }
  );
  return (
    <div className="quiz-container">
      <div className="wrapper">
        <h1 style={{ textAlign: "center" }}>Edit/Preview Quiz</h1>
        <form onSubmit={handleSubmit} className="quiz-form">
          <div className="form-input">
            <label htmlFor="question">Question</label>
            <input
              value={quiz?.data?.question}
              type="text"
              required
              id="question"
              name="question"
            />
          </div>

          <div className="form-input">
            <label htmlFor="categories" className="items">
              Categories
            </label>
            <select name="category" id="category" required>
              <option
                value="current-affair"
                selected={quiz?.data.category === "current-affair"}>
                Current Affairs
              </option>
              <option
                value="politics"
                selected={quiz?.data.category === "politics"}>
                Politics
              </option>
              <option
                value="history"
                selected={quiz?.data.category === "history"}>
                History
              </option>
              <option
                value="geography"
                selected={quiz?.data.category === "geography"}>
                Geography
              </option>
            </select>
          </div>
          <div className="form-input">
            <label htmlFor="option" className="items">
              Option-A
            </label>
            <input
              type="text"
              required
              id="option0"
              value={quiz?.data.options[0]}
              name="option"
            />
            <input
              type="radio"
              name="answer"
              id="ans1"
              checked={opt === 1}
              onClick={() => setOpt(1)}
              className="items radio"
            />
          </div>

          <div className="form-input">
            <label htmlFor="option1" className="items">
              Option-B
            </label>
            <input
              type="text"
              required
              id="option1"
              name="option"
              value={quiz?.data.options[1]}
            />
            <input
              type="radio"
              name="answer"
              id="ans2"
              className="items radio"
              checked={opt === 2}
              onClick={() => setOpt(2)}
            />
          </div>

          <div className="form-input">
            <label htmlFor="option2" className="items">
              Option-C
            </label>
            <input
              type="text"
              required
              id="option2"
              name="option"
              value={quiz?.data.options[2]}
            />
            <input
              type="radio"
              name="answer"
              id="ans3"
              className="items radio"
              checked={opt === 3}
              onClick={() => setOpt(3)}
            />
          </div>

          <div className="form-input">
            <label htmlFor="option3" className="items">
              option-D
            </label>
            <input
              type="text"
              required
              id="option3"
              name="option"
              value={quiz?.data?.options[3]}
            />
            <input
              type="radio"
              name="answer"
              id="ans4"
              className="items radio"
              checked={opt === 4}
              onClick={() => setOpt(4)}
            />
          </div>
          <div className="form-input">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Quiz;
