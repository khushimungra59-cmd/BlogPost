import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmationModel from "./ConfirmationModel";
import { useContext, useState } from "react";
import { EditProfileModel } from "./EditProfileModel";
import { FaMoon } from "react-icons/fa";
import { ModeContext } from "../Context/ModeContext";


export function Navbar() {
  const navigate = useNavigate();
  const ctx= useContext(ModeContext);
  console.log(ctx,"Context value");
  
  const loggedInUserData = JSON.parse(localStorage.getItem("lognData")) || {};
  console.log(loggedInUserData);
  const [showModel, setShowModel] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const userInitial = loggedInUserData?.role?.charAt(0).toUpperCase();

  const showModeHandler = () => {
    setShowModel(true);
  };
  const hideModelHandler = () => {
    setShowModel(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("lognData");
    localStorage.removeItem("user");
    setShowModel(false);
    navigate("/login");
  };

  return (
    <>
      {""}
      <nav className={`nav ${ctx.mode == "dark" ? "nav-dark":"nav-light"}`}>
        <h2>BlogPost</h2>
        <ul>
          <li className="navbar">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-link" : "")}
            >
              Home
            </NavLink>
          </li>

          {loggedInUserData?.role === "admin" ? (
            <li className="navbar">
              <NavLink
                to="/new-post"
                className={({ isActive }) => (isActive ? "nav-link" : "")}
              >
                New Post
              </NavLink>
            </li>
          ) : (
            <></>
          )}

          <li className="navbar">
            <NavLink
              to="/ExplorePost"
              className={({ isActive }) => (isActive ? "nav-link" : "")}
            >
              Explore Post
            </NavLink>
          </li>
          <button type="button" className="btn2" onClick={showModeHandler}>
            <b>Logout</b>
          </button>
        </ul>

        <div className="theme-toggle">
          <div className="dark-icon">
            <FaMoon />
          </div>
          <span className="dark-text" onClick={ctx.toggleMode}>{ctx.mode=== "dark" ? "Dark" : "Light"}</span>
        </div>
        
        <span className="a" onClick={setShowEditModel}>
          {userInitial}
        </span>{" "}
      </nav>
      {showEditModel && (
        <EditProfileModel
          onClose={() => setShowEditModel(false)}
          userId={loggedInUserData?.id}
        />
      )}

      {showModel && (
        <ConfirmationModel
          title="Logout?"
          desc="Are You Sure To Want Logout From  Site"
          onClose={hideModelHandler}
          onConfirm={logoutHandler}
          confirmBtnText="Logout"
        />
      )}
    </>
  );
}
