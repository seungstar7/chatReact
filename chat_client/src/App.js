import Chat from './component/talk/chat';
import io from 'socket.io-client';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Login from './component/login/login';
import './App.css';
import UserJoin from './component/login/UserJoin';
//import ChatList from './component/chat/ChatList';
import Topbar from './component/topbar/Topbar';
import FriendList from './component/Friend/FriendList';
import { AuthContext } from './context/AuthContext';
import { useState } from 'react';

const socket = io.connect("http://localhost:3001");
function App() {
  const [ Auth, setAuth ] = useState(null)

  return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/chat/:room/:username' element={<Chat socket={socket}/>} />
          <Route path='/UserJoin' element={<UserJoin/>} />
          <Route path='/friendlist/:id' element={<FriendList/>} />
          {/* <Route path='/chatlist/:id' element={<ChatList/>} /> */}
        </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
