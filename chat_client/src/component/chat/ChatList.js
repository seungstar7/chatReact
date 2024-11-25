import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from "axios";
import Footer from '../element/Footer'



const ChatList = () => {
    const [ findId, setFindId ] = useState();
    const [data, setData] = useState([]);
    const [fdata, setfData] = useState([]);
    const id = useParams().id;
    useEffect(() =>{
        Axios.get(`http://localhost:3001/getlist/${id}`)
        .then((res) => {
            if(res.data.length===0){
                setData([{id: id, fid: null, roomno: null}]);
            }else{
                setData(res.data)
            }

        })
    },[id])

    console.log(id)
    

    const findFriend = () =>{
        var already;
        for(let i=0; i<data.length; i++){
            if(data[i].fid===findId){
                already = 1;
            }
        }
        if( id === findId ){
            alert("아이디가 같다")
        }else if( findId === undefined || findId === null || findId === "" ){
            alert("검색어를 입렵해 주세요") 
        }else if(already===1){
            alert("이미 등록된 친구")
        }else{
            Axios.get(`http://localhost:3001/findfriend/${findId}`)
            .then((res) => {
                if(res.data.length === 0){
                    alert("해당 아이디의 친구가 없습니다")
                    setfData([]);
                }else{
                    alert("친구발견!")
                    setfData(res.data);
                }
            })
        }
    }

    const addfriend = (parms) =>{
        console.log(parms)
        const msg = `${parms}님을 친구 추가 하시겠습니까?`
        if(window.confirm(msg)){
            Axios.get(`http://localhost:3001/addfriend/${id}/${parms}`)
            .then((res) => {
                if (res.data==="success"){
                    alert("친추성공")
                    window.location.replace(`http://localhost:3000/chatlist/${id}`)
                }else{
                    alert("친추실패")
                }
                
            })
        }
    }

    const joinchat = (params) => {
        if(params.roomno===null){
            const talkroom = ""+
            new Date(Date.now()).getFullYear()+
            Number(new Date(Date.now()).getMonth()+1)+
            new Date(Date.now()).getDate()+
            new Date(Date.now()).getHours()+
            new Date(Date.now()).getMinutes()+
            new Date(Date.now()).getSeconds()+
            new Date(Date.now()).getMilliseconds()+
            Math.round(Math.random() * 10000).toString();
            console.log(talkroom)
            Axios({
                url: "http://localhost:3001/createroom", 
                method :'post',
                data :{
                    id : params.id,
                    fid : params.fid,
                    talkroom : talkroom
                }
            })
            .then(function (response) {
                if(response.statusText==="OK"){
                    window.open(`http://localhost:3000/chat/${talkroom}/${id}`,'window_name','width=430,height=500,location=no,resizable=no ,status=no,scrollbars=yes')
                    window.location.replace(`http://localhost:3000/chatlist/${id}`)
                }else{
                    alert("채팅방 개설하는데 에러가 발생했습니다 다시시도 해주세요")
                }
            })
        }else{
            window.open(`http://localhost:3000/chat/${params.roomno}/${id}`,'window_name','width=430,height=500,location=no,resizable=no ,status=no,scrollbars=yes')

        }
    }
    


    return (
        <div>
            <h1>친구리스트2</h1>
            <input 
                type="text" 
                placeholder='아이디 혹은 닉네임으로 친구찾기' 
                onChange={(event) => { 
                setFindId(event.target.value) 
                }} 
            />
            <button onClick={findFriend}>친구 찾기</button>
            {fdata.map(data => {
                return(
                    <h1 key={data.id}><button onClick={()=>addfriend(data.id)}>{data.id} 님을 친구 추가하기</button></h1>
                ) 
            })}

            
            <br/>
            <br/>
            <br/>

            {data.map(data => {
                return(
                    <h1 onClick={()=>joinchat(data)} key={data.fid}>{data.fid===null ? `등록된 친구가 없습니다 친구를 등록해 주셍` : `${data.fid} 님과의 채팅`}</h1>
                )
            })}
            <Footer/>
        </div>
    );
};

export default ChatList;