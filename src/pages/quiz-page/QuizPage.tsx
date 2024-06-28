import { Navigate } from "react-router-dom";
import "./quiz-page.css";
import { useMutation } from "react-query";
import { QuesDto, createQuestion } from "../../utils/api";
import { AxiosResponse, AxiosError } from "axios";
import { UserInfoStore } from "../../utils/store";
import { useState } from "react";

function QuizPage() {
  const isLogin = UserInfoStore.useState((s) => s.isLogin);
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
    for (let index = 2; index < e.target.length - 1; index++) {
      options.push({ content: e.target[index].value });
    }

    const payload = {
      content: e.target["question"].value,
      options,
      answer: { content: e.target["answer"].value },
      category: category,
    };
    console.log(payload);
    mutate(payload);
    for (let index = 0; index < e.target.length - 1; index++) {
      e.target[index].value = "";
    }
  }

  return isLogin ? (
    <div className="quiz-container">
      <div className="wrapper">
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
            <option value="politics">Politics</option>
            <option value="history">History</option>
            <option value="biography">Biography</option>
            <option value="bible">Bible Quiz/Church hisstory</option>
          </select>
        </div>
        <form onSubmit={handleSubmit} className="quiz-form">
          <div className="form-input">
            <label htmlFor="question">Question</label>
            <input type="text" required id="question" name="question" />
          </div>
          <div className="form-input">
            <label htmlFor="ans">Answer</label>
            <input type="text" required id="ans" name="answer" />
          </div>

          <div className="form-input">
            <label htmlFor="option1">Option-A</label>
            <input type="text" required id="option1" name="option1" />
          </div>

          <div className="form-input">
            <label htmlFor="option2">Option-B</label>
            <input type="text" required id="option2" name="option2" />
          </div>

          <div className="form-input">
            <label htmlFor="option3">option-C</label>
            <input type="text" required id="option3" name="option3" />
          </div>
          <div className="form-input">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
}

export default QuizPage;
