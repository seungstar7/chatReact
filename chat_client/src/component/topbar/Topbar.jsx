import "./topbar.css";
import Search from "@material-ui/icons/Search";
import Person from "@material-ui/icons/Person"
import Chat from "@material-ui/icons/Chat"
import Notifications from "@material-ui/icons/Notifications"
import { Link } from "react-router-dom";
import {useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar(props) {
  const { Auth } = useContext(AuthContext);
  // console.log(user + "이게 무슨 유저냐")
  //const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const [findId,setFindId] = useState('');
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Talk_ing</span>
        </Link>
      </div>
      <div className="topbarCenter">
        {/*<button onClick={props.findFriend()}>asda</button>*/}
        <div className="searchbar">
          <Search className="searchIcon" onClick={props.findFriend} />
          <input
            placeholder="아이디 혹은 닉네임으로 친구찾기"
            className="searchInput"
            onChange={(event) => {
              props.setFindId(event.target.value)
            }}
            onKeyDown={(e)=>{if(e.key =='Enter')props.findFriend()}}
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
