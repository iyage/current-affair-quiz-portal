/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QUIZ, UserInfoStore } from "../../utils/store";
import "./quiz.css";
import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { updateQuestion } from "../../utils/api";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
export interface QUIZUPDATE {
  id: string;
  quiz: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  solution: string;
  answer: number | undefined;
  category: string;
  country: string;
}
let payload = {} as QUIZUPDATE | any;
function Quiz() {
  const params = useParams();
  const [quiz, setQuiz] = useState<QUIZ | undefined>(undefined);
  const [id, setId] = useState<any>("");
  const [idx, setIdx] = useState<any>(0);
  const [opt, setOpt] = useState<any>(null);
  const quizs = UserInfoStore.useState((s) => s.quizs);
  const token = UserInfoStore.useState((s) => s.token);
  const [ques, setQues] = useState<string>("");
  const [optionA, setOptionA] = useState<string>("");
  const [optionB, setOptionB] = useState<string>("");
  const [optionC, setOptionC] = useState<string>("");
  const [optionD, setOptionD] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  useEffect(() => {
    setId(params.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    quizs.find((quiz, index) => {
      setIdx(index);
      return quiz.id == params.id;
    });
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
    payload.answer = answer;
    payload.solution = e.target["solution"].value;
    console.log(payload);
    mutate(payload);
    payload = {};
  }

  const { mutate } = useMutation(
    (variables: QUIZUPDATE) => updateQuestion(variables, token, id),
    {
      onSuccess: (data: AxiosResponse) => {
        console.log(data);
        alert("Question updated successfully");
        UserInfoStore.update((s) => {
          [
            s.quizs.forEach((quiz) => {
              if (quiz.id === id) {
                quiz.quiz = ques;
                quiz.options = [optionA, optionB, optionC, optionD];
                quiz.solution = solution;
              }
            }),
          ];
        });
      },
      onError: (err: AxiosError) => {
        alert("Error! Try again......");
        console.log(err);
      },
    }
  );
  function handleNext() {
    console.log(idx);
    setIdx((prev: any) => prev + 1);
  }

  function handlePrev() {
    setIdx((prev: any) => prev - 1);
  }

  useEffect(() => {
    console.log(quizs[idx]);
    setQues(quizs[idx].quiz);
    setOptionA(quizs[idx]?.options[0]);
    setOptionB(quizs[idx]?.options[1]);
    setOptionC(quizs[idx]?.options[2]);
    setOptionD(quizs[idx]?.options[3]);
    setOpt(quizs[idx]?.answer);
    setSolution(quizs[idx]?.solution);
    setQuiz(quizs[idx]);
    setId(quizs[idx].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <div className="quiz-container">
      <div className="wrapper">
        <h1 style={{ textAlign: "center" }}>Edit/Preview Quiz</h1>
        <form onSubmit={handleSubmit} className="quiz-form">
          <div className="form-input">
            <label htmlFor="question">Question</label>
            <input
              onChange={(e) => {
                payload.quiz = e.target.value;
                setQues(e.target.value);
              }}
              value={ques}
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
            <select
              name="category"
              id="category"
              required
              onChange={(e) => {
                payload.category = e.target.value;
              }}>
              <option
                value="current-affair"
                selected={quiz?.category === "current-affair"}>
                Current Affairs
              </option>
              <option value="politics" selected={quiz?.category === "politics"}>
                Politics
              </option>
              <option value="history" selected={quiz?.category === "history"}>
                History
              </option>
              <option
                value="geography"
                selected={quiz?.category === "geography"}>
                Geography
              </option>
            </select>
          </div>
          <div className="form-input">
            <label htmlFor="option" className="items">
              Option-A
            </label>
            <input
              onChange={(e) => {
                payload.optionA = e.target.value;
                setOptionA(e.target.value);
              }}
              type="text"
              required
              id="option0"
              value={optionA}
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
              onChange={(e) => {
                payload.optionB = e.target.value;
                setOptionB(e.target.value);
              }}
              type="text"
              required
              id="option1"
              name="option"
              value={optionB}
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
              onChange={(e) => {
                payload.optionC = e.target.value;
                setOptionC(e.target.value);
              }}
              type="text"
              required
              id="option2"
              name="option"
              value={optionC}
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
              onChange={(e) => {
                payload.optionD = e.target.value;
                setOptionD(e.target.value);
              }}
              type="text"
              required
              id="option3"
              name="option"
              value={optionD}
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
            <div style={{ flex: "100%" }}>
              <textarea
                style={{ width: "100%" }}
                name="solution"
                id=""
                rows={7}
                value={solution}
                onChange={(e) => {
                  setSolution(e.target.value);
                }}></textarea>
              <p style={{ textAlign: "end" }}>{solution.length}</p>
            </div>
          </div>
          <div className="form-input">
            <button>Submit</button>
          </div>
        </form>
        <div className="table-footer">
          <div className="footer-wrapper">
            <button>
              <FaChevronCircleLeft onClick={handlePrev} />
            </button>{" "}
            <button onClick={handleNext}>
              <FaChevronCircleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
