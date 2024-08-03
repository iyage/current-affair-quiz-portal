import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import "./quizs.css";
import { useQuery } from "react-query";
import { QUIZ, UserInfoStore } from "../../utils/store";
import { AxiosError, AxiosResponse } from "axios";
import { delQuiiz, getQuizs } from "../../utils/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const pageLimit = 10;
function Quizs() {
  const [tabArr, setTabArr] = useState<QUIZ[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const quizs = UserInfoStore.useState((s) => s.quizs);
  const token = UserInfoStore.useState((s) => s.token);
  const { isLoading } = useQuery({
    queryKey: ["quizs"],
    queryFn: () => getQuizs(token),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data: AxiosResponse) => {
      const resp = data.data;
      console.log(resp);
      UserInfoStore.update((s) => {
        [(s.quizs = resp)];
      });
    },
    onError: (error: AxiosError) => {
      if (error.code === "ERR_NETWORK") {
        alert("Please check your network");
      }
    },
  });

  async function handleDel(id: string) {
    try {
      const resp = await delQuiiz(id, token);
      console.log(resp);
      UserInfoStore.update((s) => {
        s.quizs = quizs.filter((quiz) => {
          return quiz.id !== id;
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        alert("Please check your network");
      } else {
        alert(error.message);
      }
    }
  }

  function handleNext() {
    setCurrentPage((prev) => prev + 1);
  }

  function handlePrev() {
    setCurrentPage((prev) => prev - 1);
  }

  useEffect(() => {
    const offSet = pageLimit * currentPage - pageLimit;
    setTabArr(quizs.slice(offSet, pageLimit + offSet));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  return (
    <div className="quizs-container">
      {isLoading}
      <h1 style={{ textAlign: "center" }}>Quizs</h1>
      <div className="wrapper">
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Question</th>
              <th>Date added</th>
              <th>last Updated date</th>
              <th>Edit/Review</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tabArr.map((quiz, index) => {
              return (
                <tr key={quiz.id}>
                  <td>{index + 1}</td>
                  <td>{quiz.quiz}</td>
                  <td> {new Date().toISOString()}</td>
                  <td> {new Date().toISOString()}</td>
                  <td>
                    {" "}
                    <Link to={`/pages/quiz/${quiz.id}`}>
                      <FaEdit className="edit-btn" />
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <FaTrash
                      className="del-btn"
                      onClick={() => handleDel(quiz.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>
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
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Quizs;
