import { Store } from "pullstate";
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}
export interface QUIZ {
  id: string;
  quiz: string;
  options: string[];
  answer: number;
  category: string;
  country: string;
  solution: string;
}

export const UserInfoStore = new Store({
  token: "",
  isLogin: false,
  userInfo: {} as User,
  quizs: [] as QUIZ[],
});
