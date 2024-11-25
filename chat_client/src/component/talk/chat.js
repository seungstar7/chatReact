//import React, { useState } from 'react';
import Display from './display';
import Input from './input';
import User from './user';
import './talk.css'
import { useParams } from 'react-router-dom';


const Chat = ({socket}) => {
    const room = useParams().room;
    const username = useParams().username;
    
    return (
        <div className="wrapper">
            <User username={username}/>
            <Display socket={socket} username={username} room={room}/>
            <Input socket={socket} username={username} room={room}/>
        </div>
    );
};

export default Chat;