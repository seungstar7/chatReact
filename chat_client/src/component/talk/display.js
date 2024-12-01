import Axios  from 'axios';
import React, { useEffect, useRef, useState } from 'react';


const Display = ({socket , username, room }) => {
    const chatlist = window.document.querySelector("#chatlist");
    const [messageList, setMessgList] = useState([]);
    const scrollRef = useRef();
    console.log(scrollRef.current);

    useEffect(() => {
        socket.on(room,(data) => {
            setMessgList((list) => [...list, data])  
            // setTimeout(() => {
            //     scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
            //   }, 100);
            //
        })
    }, [socket,room])
    
    useEffect(() => {
        // scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        Axios.get(`http://localhost:3001/getchat/${room}`)
        .then((res) => {
            setMessgList(res.data) 
            // setTimeout(() => {
            //     scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
            // }, 100);
        })
    },[room])


    return (
        <div className="display-container">
            <div>
            <ul className="chatting-list" >
            {messageList.map((messagedata, index) => {
                    return (
                    <li key={index} className={username === messagedata.id ?  "sent" : "received" }>
                        <span className="profile">
                            <span className="user">{messagedata.id}</span>
                            <img className="image" src="https://placeimg.com/50/50/any" alt="any"></img>     
                        </span>
                            <span className="message">{messagedata.msg}</span>
                            <span className="time">{messagedata.msgtime}</span>
                    </li>);
                })}
            </ul>
            <div ref={scrollRef}></div>
            </div>
        </div>
        
    );
};

export default Display;