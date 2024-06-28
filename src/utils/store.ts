import { Store } from "pullstate";
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export const UserInfoStore = new Store({
  token: "",
  isLogin: false,
  userInfo: {} as User,
});
