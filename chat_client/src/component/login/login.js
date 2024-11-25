import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";
import './login.css'
import {AuthContext} from '../../context/AuthContext';

const Login = () => {
  const [Id, setId] = useState();
  const [password, setPassword] = useState();
  const history = useNavigate();
  const { setAuth } = useContext(AuthContext);


  const data = {
    id: Id,
    pw: password
  }

  const JoinRoom = () => {
    
    
    if (Id !== "" && password !== "") {
      Axios({
        url: "http://localhost:3001/login",
        method: 'post',
        data
      })
        .then((res) => {
          let result = res.data[0].cnt;
          if (result === 1) {
            alert("로그인 성공!");
            setAuth(Id);
            history(`/friendlist/${Id}`)
          } else {
            alert("로그인 실패!!");
            //setAuth(null);
          }
        });
    }
  }

  return (
    
    <div className="login-box">
      
      <h2>Log-in</h2>
      <form>
      <div className="user-box">
      <input
        type="text"
        placeholder=''
        onChange={(event) => {
          setId(event.target.value)
        }}
      />
      <label>Username</label>
      </div>
      <div className="user-box">
      <input
        type="text"
        placeholder=''
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      />
      <label>Password</label>
      </div>
      <a href="#" onClick={JoinRoom}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      로그인
    </a>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Link to={'UserJoin'}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      회원가입
    </Link>
      </form>
    </div>
  );
};

export default Login;