import { Navigate, Outlet } from "react-router-dom";
import "./page.css";
import SideBar from "../../components/side-bar/SideBar";
import { UserInfoStore } from "../../utils/store";
function Page() {
  const isLogin = UserInfoStore.useState((s) => s.isLogin);
  return isLogin ? (
    <div className="page-container">
      <SideBar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
}

export default Page;
