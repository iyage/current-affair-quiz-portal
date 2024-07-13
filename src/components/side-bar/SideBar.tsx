import { Link } from "react-router-dom";
import "./side-bar.css";
import { FaBook, FaLayerGroup } from "react-icons/fa";
function SideBar() {
  return (
    <div className="side-bar-container">
      <div className="wrapper">
        <ul>
          <li>
            <Link to={"/pages"}>
              <FaBook />
              <span> Quiz Page</span>
            </Link>
          </li>
          <li>
            <Link to={"/pages/quizs"}>
              <FaLayerGroup /> <span>Quizs</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
