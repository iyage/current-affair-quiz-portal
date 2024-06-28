import { ReactNode, createContext, useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
}
interface AppContextType {
  userInfo: User;
  token: string;
  loggedIn: boolean;
  readonly updateUser?: (user: User, token: string, loggedIn: boolean) => void;
}
const userData: User = {
  firstName: "",
  lastName: "",
  id: "",
  email: "",
};
interface Props {
  children?: ReactNode;
}
export const UserContext = createContext<AppContextType | null>(null);
export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<AppContextType>({
    userInfo: userData,
    token: "",
    loggedIn: false,
    updateUser: (userInfo: User, token: string, loggedIn: boolean) =>
      setUser({ token, userInfo, loggedIn }),
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
