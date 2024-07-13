import { useMutation } from "react-query";
import "./login.css";
import { LoginDto, login } from "../../utils/api";
import { AxiosError, AxiosResponse } from "axios";
import { Navigate } from "react-router-dom";
import { UserInfoStore } from "../../utils/store";
interface LoginResp {
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      id: string;
    };
  };
}
function Login() {
  const isLogin = UserInfoStore.useState((s) => s.isLogin);
  const { mutate } = useMutation((variables: LoginDto) => login(variables), {
    onSuccess: (data: AxiosResponse) => {
      const resp: LoginResp = data.data;
      UserInfoStore.update((s) => {
        [
          (s.userInfo = resp.data.user),
          (s.token = resp.data.accessToken),
          (s.isLogin = true),
        ];
      });
    },
    onError: (err: AxiosError) => {
      alert("invalid credentials");
      console.log(err);
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(e: any) {
    e.preventDefault();
    const data: LoginDto = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    mutate(data);
  }
  return !isLogin ? (
    <>
      <div className="login-container">
        <div className="login-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                required
                id="email"
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="form-input">
              {" "}
              <button>log-in</button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    <Navigate to={"/pages"} />
  );
}

export default Login;
