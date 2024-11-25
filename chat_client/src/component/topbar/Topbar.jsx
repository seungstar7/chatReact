import "./topbar.css";
import Search from "@material-ui/icons/Search";
import Person from "@material-ui/icons/Person"
import Chat from "@material-ui/icons/Chat"
import Notifications from "@material-ui/icons/Notifications"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { Auth } = useContext(AuthContext);
  // console.log(user + "이게 무슨 유저냐")
  //const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Talk_ing</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon"  />
          <input
            placeholder="친구 찾기"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink"> </span>
          <span className="topbarLink"> </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/`}>
          <img
            // src={
            //   user.profilePicture
            //     ? PF + user.profilePicture
            //     : PF + "person/noAvatar.png"
            // }
            alt=""
            className="topbarImg"
          />
          <p>{Auth}</p>
        </Link>
      </div>
    </div>
  );
}
