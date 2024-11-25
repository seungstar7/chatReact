import Axios from 'axios';
import { useState } from 'react';


const Input = function({socket, username, room}) {
    const [ currentMessage, setCurrentMessage ] = useState();
    const chatInput = document.querySelector(".chatting-input")
   
    const onenterkey = (event) => {
        if(event.key==='Enter'){
            sendMessage();
        }
    }
    
    
    const sendMessage = async () => {
        if (currentMessage !=="") {
            const messgeData = {
                roomno: room,
                id: username,
                msg : currentMessage,
                msgtime : 
                new Date(Date.now()).getHours() + 
                ":" + 
                new Date(Date.now()).getMinutes()
            }
            chatInput.value = null;
            await socket.emit("send_message", messgeData)
            Axios({
                url: "http://localhost:3001/messagein", 
                method :'post',
                data : messgeData
            })
            .then((res) => {
              if(res.statusText!=="OK"){
                alert("메세지 입력에 실패했습니다")

              }
            })
        }else{
            alert("메세지를 입력해라 새끼야")
        }
    }

    return (
        <div className="input-container">
            <span>
            <input 
                onKeyPress={onenterkey}
                className="chatting-input"
                id="inputmessage"
                type="text" 
                placeholder='메세지' 
                onChange={(event) => { 
                    setCurrentMessage(event.target.value) 
                }} 
            />
            <button className="send-button" onClick={sendMessage}>전송</button>
            </span>
        </div>
    );
};

export default Input;