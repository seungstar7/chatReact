import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";

const UserJoin = () => {
    const [Id , setId] = useState();
    const [password, setPassword] = useState();
    const [ nickname , setnickname ] = useState();

    const JoinUser = () => {
        if(Id !== "" && password !== ""){
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
                console.log(response);
            })
            //실패 시 catch 실행
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    return (
        <div>
            <h1>유저 회원가입</h1>
            <div>
                <label>유저ID : </label>
                <input 
                    type="text"
                    placeholder='ID를 입력하시오'
                    onChange={(event) => { 
                        setId(event.target.value) 
                    }} 
                />
            </div>
            <div>
                <label>비밀번호 : </label>
                <input 
                    type="text"
                    placeholder='비번를 입력하시오'
                    onChange={(event) => { 
                        setPassword(event.target.value) 
                    }} 
                />
            </div>
            <div>
                <label>닉네임 : </label>
                <input 
                    type="text"
                    placeholder='닉네임을 입력하시오'
                    onChange={(event) => { 
                        setnickname(event.target.value) 
                    }} 
                />
            </div>
            <button onClick={JoinUser}><Link to="/">회원가입</Link></button>
        </div>
    );
};

export default UserJoin;