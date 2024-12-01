import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from "axios";
import Footer from '../element/Footer'
import './Friend.css'
import { AuthContext } from '../../context/AuthContext';
import Modal from '../modal/Modal';
import Topbar from '../../component/topbar/Topbar';
import profile from '../../profileImg/8726390_user_icon.png'
import profile2 from '../../profileImg/8726458_user_check_icon.png'




const FriendList = () => {
    const { Auth } = useContext(AuthContext)
    const id = useParams().id;
    const [findId, setFindId] = useState(); //검색 아이디

    const [ myData , setMyData ] = useState({});
    const [data, setData] = useState([]);   //친구 목록데이터
    const [fdata, setfData] = useState([]); //검색된 친구 목록

    const [isOpen, setIsOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isNewChat, setNewChat] = useState(false);
    
    const [friendCount, setFriendCount] = useState(0);
    const Navigate = useNavigate();

    /*
    if (Auth !== id) {

    } else if (Auth == null) {
        alert("잘못된 접근 방식데스?")
        Navigate(-1)
    }*/

    useEffect(()=>{
        Axios.get(`http://localhost:3001/myprofile/${id}`)
        .then((res)=>{
            setMyData(res.data[0])
        })

    },[modalOpen])

    useEffect(() => {
        Axios.get(`http://localhost:3001/getlist/${id}`)
            .then((res) => {
                if (res.data.length === 0) {
                    setData([]);
                } else {
                    setFriendCount(res.data.length);
                    setData(res.data)
                }

            })
    }, [friendCount])


    const findFriend = () => {
        var already;
        for (let i = 0; i < data.length; i++) {
            if (data[i].fid === findId) {
                already = 1;
            }
        }
        if (id === findId) {
            alert("아이디가 같다")
        } else if (findId === undefined || findId === null || findId === "") {
            alert("검색어를 입렵해 주세요")
        } else if (already === 1) {
            alert("이미 등록된 친구")
        } else {
            Axios.get(`http://localhost:3001/findfriend/${findId}`)
                .then((res) => {
                    if (res.data.length === 0) {
                        alert("해당 아이디의 친구가 없습니다")
                        setfData([]);
                    } else {
                        // alert("친구발견!")
                        setfData(res.data);
                    }
                })
        }
    }

    const addfriend = (parms) => {
        console.log(parms)
        const msg = `${parms.id}님을 친구 추가 하시겠습니까?`
        if (window.confirm(msg)) {
            Axios.get(`http://localhost:3001/addfriend/${id}/${parms.id}`)
                .then((res) => {
                    if (res.data === "success") {
                        alert("친추성공")
                        setData([parms])
                        setFriendCount(friendCount+1)
                        setfData([]);
                    } else {
                        alert("친추실패")
                    }

                })
        }
    }



    const joinchat = (params) => {
        console.log(Auth)
        if(!Auth){
            alert("세션정보가 없습니다")
            Navigate('/')
        }
        if (params.roomno === null) {
            const talkroom = "" +
                new Date(Date.now()).getFullYear() +
                Number(new Date(Date.now()).getMonth() + 1) +
                new Date(Date.now()).getDate() +
                new Date(Date.now()).getHours() +
                new Date(Date.now()).getMinutes() +
                new Date(Date.now()).getSeconds() +
                new Date(Date.now()).getMilliseconds() +
                Math.round(Math.random() * 10000).toString();
            console.log(talkroom)
            Axios({
                url: "http://localhost:3001/createroom",
                method: 'post',
                data: {
                    id: Auth,
                    fid: params.fid,
                    talkroom: talkroom
                }
            })
                .then(function (response) {
                    if (response.statusText === "OK") {
                        window.open(`http://localhost:3000/chat/${talkroom}/${id}`, 'window_name', 'width=430,height=500,location=no,resizable=no ,status=no,scrollbars=yes')
                        window.location.replace(`http://localhost:3000/chatlist/${id}`)
                    } else {
                        alert("채팅방 개설하는데 에러가 발생했습니다 다시시도 해주세요")
                    }
                })
        } else {
            window.open(`http://localhost:3000/chat/${params.roomno}/${id}`, 'window_name', 'width=430,height=500,location=no,resizable=no ,status=no,scrollbars=yes')

        }
    }
    const [i, seti] = useState();
    const listclick = (index) => {
        seti(index)
        setIsOpen(!isOpen)

    }

    

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        const msg = "현재 진행중 데이터가 있습니다 \n닫으시겠습니까?"
        if(window.confirm(msg))setModalOpen(false);
    };

    const updatprofile = (params) =>{
        const statusData = {
            id : id,
            nickname : params.nickname,
            status_msg : params.status_msg
        }
        Axios({
            url: "http://localhost:3001/updateprofile",
            method: 'post',
            data: statusData
        })
        .then((res)=>{
            if(res.statusText==='OK'){
                alert("닉네임 변경에 성공했습니다")
                setModalOpen(false)
            }else{
                alert("닉네임 변경에 실패하셨습니다 다시 시도해 주세요")
            }
        })     

    }



    return (
        
        <div >
            <Topbar setFindId = {setFindId} findFriend = {findFriend}/>
            <br />
            {/*<input*/}
            {/*    type="text"*/}
            {/*    placeholder='아이디 혹은 닉네임으로 친구찾기'*/}
            {/*    onChange={(event) => {*/}
            {/*        setFindId(event.target.value)*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<button*/}
            {/*    className='findbtn'*/}
            {/*    onClick={findFriend}*/}
            {/*>*/}
            {/*    친구 찾기*/}
            {/*</button>*/}
            <ul className="friend-list">
            {fdata.map((data, idx) => {
                console.log(data)
                return (
                    <li key={idx} style={{ cursor: 'pointer' }} onClick={() => listclick(idx)}>
                            <span className="profile">
                                <img className="image" src={profile} alt="any"></img>
                                <span className="friend">
                                    <p className="name">{data.id}({data.nickname})</p>
                                    <p className="status">{data.status_msg}</p>
                                </span>
                                {isOpen === true && i === idx && (<button className="chat" onClick={() => addfriend(data)} style={{ cursor: 'pointer' }}>친구추가</button>)}
                                {/*{isOpen === true && i === idx && (<button className="del" style={{ cursor: 'pointer' }}>삭제하기</button>)}*/}
                            </span>
                                </li>




                    // <h1 key={idx}><button onClick={() => addfriend(data)}>{(data.ID)} 님을 친구 추가하기</button></h1>
                )
            })}

            </ul>


            {/*<br />*/}
            {/*<br />*/}
            {/*<br />*/}


            {friendCount === 0 && (

                <h1>친구를 추가하여 대화를 해보세요!</h1>
            )}

                <p className="friend_count">{id}님의 프로필</p>
                <ul className="friend-list">
                <li style={{ cursor: 'pointer' }} onClick={openModal}>
                    <span className="profile">
                        <img className="image" src={isNewChat ? profile : profile2} alt="any"></img>
                        {/*<img className="image" src="https://placeimg.com/50/50/any" alt="any"></img>*/}
                        <span className="friend">
                            <p className="name">{myData.nickname}</p>
                            <p className="status">{myData.status_msg}</p>
                        </span>
                    </span>
                </li>
                <br />
                <p className="friend_count">친구 {friendCount}</p>
                <Modal open={modalOpen} close={closeModal} save={updatprofile}  data={myData} header={id+"님의 프로필수정"}/>

                {data.map((data, index) => {
                    console.log(data)
                    console.log("채팅 레이어")
                    return (
                        <li key={index} style={{ cursor: 'pointer' }} onDoubleClick={() => joinchat(data)} onClick={() => listclick(index)}>
                            <span className="profile">
                                <img className="image" src={profile} alt="any"></img>
                                <span className="friend">
                                    <p className="name">{data.fid}({data.nickname})</p>
                                    <p className="status">{data.status_msg}</p>
                                </span>
                                {isOpen === true && i === index && (<button className="chat" onClick={() => joinchat(data)} style={{ cursor: 'pointer' }}>채팅하기</button>)}
                                {isOpen === true && i === index && (<button className="del" style={{ cursor: 'pointer' }}>삭제하기</button>)}
                            </span>
                        </li>
                    )

                })}
                {/* {isOpen===true &&(<button>채팅하기</button>)} */}


            </ul>
            <Footer />
        </div>
    );
};

export default FriendList;