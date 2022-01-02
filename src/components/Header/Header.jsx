import { React } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Paper, TextField } from "@mui/material";
import { Navigate } from "react-router-dom";
import { getUserPayload } from "../../authService";
import { useSelector, useDispatch } from "react-redux";
import { RemoveUser } from "../redux/UserContext/UserSlice";
import { Card } from "@mui/material";
import { selectUser } from "../redux/UserContext/UserSlice";
const Header = () => {
  const dispatch = useDispatch();

  const user_state = useSelector(selectUser);

  const data = getUserPayload(localStorage.getItem("token"));
  // console.log(data);
  const handleLogout = () => {
    dispatch(RemoveUser());
    localStorage.removeItem("token");
    <Navigate to="/signin" />;
  };
  return (
    <Card style={{ position: "sticky" }}>
      <div className="header">
        <Link to="/">
          <img
            className="logo__header"
            src="/images/SignUp.png"
            alt="Not Found"
          />
        </Link>
        <div className="header__search">
          <input
            style={{ height: "25px", width: "30%", borderRadius: "3px" }}
            type="text"
          />
          {/* Search Logo */}
          <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__nav">
        <div className="header__option">
            <img
              src="/images/nav-home.svg"
              alt=""
              style={{ height: "33px", width: "35px",opacity:"0.6" }}
            />
            <Link to="/">
            <span className="header__optionLineOne">Home</span>
            </Link>
          </div>
          <div className="header__option">
            <img
              src="/images/nav-notifications.svg"
              alt=""
              style={{ height: "35px", width: "35px" }}
            />
            <span className="header__optionLineOne">Notifications</span>
          </div>

          <div className="header__option">
            <img
              src="/images/nav-jobs.svg"
              alt=""
              style={{ height: "35px", width: "35px"}}
            />
            <span className="header__optionLineOne">Jobs</span>
          </div>
          <div className="header__option">
            
            <img
              src="/images/profile1.svg"
              alt=""
              style={{ height: "33px", width: "35px",opacity:"0.6" }}
            />
            <Link to={`/profile/${user_state.id}`} >
            <span className="header__optionLineOne">Profile</span>
            </Link>
          </div>
          <div className="header__option">
          <img
              src="/images/logout.svg"
              alt=""
              style={{ height: "32px", width: "33px",opacity:"0.7"}}
            />
            <Link to="/signin">
              <span
                className="header__optionLineOne"
                style={{ textDecoration: "None" }}
                onClick={handleLogout}
              >
                Logout
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Header;