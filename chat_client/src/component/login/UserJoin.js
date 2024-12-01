import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Axios from "axios";

const UserJoin = () => {
    const [Id , setId] = useState();
    const [password, setPassword] = useState();
    const [ nickname , setnickname ] = useState();
    const navigate = useNavigate();

    const JoinUser = () => {
        if(Id  && password){
            Axios({
                url: "http://localhost:3001/joinuser", 
                method :'post',
                data :{
                    id : Id,
                    pw : password,
                    nickname : nickname
                }
            })
            .then(function (response) {
                alert("등록 완료!");
                navigate('/')
                console.log(response);
            })
            //실패 시 catch 실행
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    return (
        <>
            <div className="login-box">

                <h2>Joining User</h2>
                <form>
                    <div className="user-box">
                        <input
                            type="text"
                            placeholder='ID를 입력하시오'
                            onChange={(event) => {
                                setId(event.target.value)
                            }}

                        />
                        <label>Username</label>
                    </div>
                    <div className="user-box">
                        <input
                            type="password"
                            placeholder='비번를 입력하시오'
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}

                        />
                        <label>Password</label>
                    </div>
                    <div className="user-box">
                        <input
                            type="text"
                            placeholder='닉네임을 입력하시오'
                            onChange={(event) => {
                                setnickname(event.target.value)
                            }}

                        />
                        <label>Nick Name</label>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <a href="/">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            이전으로
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={'UserJoin'} onClick={JoinUser}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            회원가입
                        </Link>
                    </div>
                </form>
            </div>
            {/*<h1>유저 회원가입</h1>*/}
            {/*<div style={{textAlign : 'center' , marginTop : '5rem'}}>*/}

            {/*    <div>*/}
            {/*        <label>유저ID : </label>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            placeholder='ID를 입력하시오'*/}
            {/*            onChange={(event) => {*/}
            {/*                setId(event.target.value)*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label>비밀번호 : </label>*/}
            {/*        <input*/}
            {/*            type="password"*/}
            {/*            placeholder='비번를 입력하시오'*/}
            {/*            onChange={(event) => {*/}
            {/*                setPassword(event.target.value)*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label>닉네임 : </label>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            placeholder='닉네임을 입력하시오'*/}
            {/*            onChange={(event) => {*/}
            {/*                setnickname(event.target.value)*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <button onClick={JoinUser}><Link to="/">회원가입</Link></button>*/}
            {/*</div>*/}
        </>
    );
};

export default UserJoin;