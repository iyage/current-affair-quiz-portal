import "./quiz-page.css";
import { useMutation } from "react-query";
import { QuesDto, createQuestion } from "../../utils/api";
import { AxiosResponse, AxiosError } from "axios";
import { UserInfoStore } from "../../utils/store";
import { useState } from "react";

function QuizPage() {
  const token = UserInfoStore.useState((s) => s.token);
  const [category, setCategory] = useState("");
  const { mutate } = useMutation(
    (variables: QuesDto) => createQuestion(variables, token),
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
      category: category,
    };
    mutate(payload);
    for (let index = 0; index < e.target.length - 1; index++) {
      e.target[index].value = "";
    }
    for (let index = 0; index < e.target["answer"].length; index++) {
      e.target["answer"][index].checked = false;
    }
  }

  return (
    <div className="quiz-container">
      <div className="wrapper">
        <h1 style={{ textAlign: "center" }}>Add New Quiz</h1>
        {/* <Container className="mt-5">
          <Row className="justify-content-center">
            <Col sm={12} xs={12} md={6} xxl={6}>
              <UploadToS3
                bucket={import.meta.env.VITE_S3_BUCKET}
                awsRegion={import.meta.env.VITE_REGION}
                awsKey={import.meta.env.VITE_ACCESSKEYID}
                awsSecret={import.meta.env.VITE_SECRETACCESSKEY}
                type="image"
                theme={theme}
                showNewUpload={true}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onResult={(result: any) => {
                  if (result) {
                    const imgName = result?.url.substring(
                      result?.url.indexOf("/") + 1
                    );
                    setImgUrl(
                      `https://assests-repo.s3.us-east-2.amazonaws.com/${imgName}`
                    );
                    setHideForm(false);
                  }
                }}
              />
            </Col>
          </Row>
        </Container> */}
        {/* {!hideForm &&  */}
        <div className="categories-container">
          <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
            <option value="" selected disabled>
              Categories
            </option>
            <option value="current-affair">Current Affairs</option>
            <option value="politics">Politics</option>
            <option value="history">History</option>
            <option value="geography">Geography</option>
            <option value="entertainment">Entertainment</option>
            <option value="general-knownledge">General Knowledge</option>
          </select>
        </div>
        <form onSubmit={handleSubmit} className="quiz-form">
          <div className="form-input">
            <label htmlFor="question">Question</label>
            <input type="text" required id="question" name="question" />
          </div>
          <div className="form-input">
            <label htmlFor="option" className="items">
              Option-A
            </label>
            <input type="text" required id="option0" name="option" />
            <input
              type="radio"
              name="answer"
              id="ans1"
              className="items radio"
            />
          </div>

          <div className="form-input">
            <label htmlFor="option1" className="items">
              Option-B
            </label>
            <input type="text" required id="option1" name="option" />
            <input
              type="radio"
              name="answer"
              id="ans2"
              className="items radio"
            />
          </div>

          <div className="form-input">
            <label htmlFor="option2" className="items">
              Option-C
            </label>
            <input type="text" required id="option2" name="option" />
            <input
              type="radio"
              name="answer"
              id="ans3"
              className="items radio"
            />
          </div>

          <div className="form-input">
            <label htmlFor="option3" className="items">
              option-D
            </label>
            <input type="text" required id="option3" name="option" />
            <input
              type="radio"
              name="answer"
              id="ans4"
              className="items radio"
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

export default QuizPage;
