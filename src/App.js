import React from 'react';
import './App.css';
import AppSidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './login';
import SignUp from './signup';
import { Redirect } from 'react-router';
import {io} from "socket.io-client";

function App() {
  const PORT = process.env.PORT || 5000;
  const [avatar, setAvatar] = React.useState(0);
  const [onlineUser,setOnlineUser] = React.useState()
  const [user, setUser] = React.useState(JSON.parse(sessionStorage.getItem('user')) || {});
  const [userLoggedIn, setUserLoggedIn] = React.useState(false)
  const [currentChat, setCurrentChat] = React.useState()
  const [chatWith,setChatWith] =  React.useState()
  const [socket, setsocket] = React.useState(null)
  const socketRef = React.useRef()
  

   React.useEffect(()=>{
    socketRef.current = io(`https://znx-chat-server.herokuapp.com/`)
  },[])

  React.useEffect(()=>{
    if(socketRef && user._id)
    {
    socketRef?.current.emit("User",user._id)
    socketRef?.current.on("users",users=>{
      setOnlineUser(users)
      console.log(users)
    })
    }
   setsocket(socketRef.current)
  },[socketRef,user])

 

  return (
    <Router>
      <Switch>
        <Route exact path = "/">
          <Redirect to="/login"></Redirect>
          </Route>
        <Route exact path="/home">
          {user.username ? <div className="app_body">
            <AppSidebar setAvatar={setAvatar} user={user} setCurrentChat={setCurrentChat} setChatWith={setChatWith} currentChat={currentChat} socket={socket}/>
            <Chat avatar={avatar} user={user} currentChat={currentChat} chatWith={chatWith} onlineUser={onlineUser} socket={socket} setCurrentChat={setCurrentChat} /></div> : <Redirect to="/login" />
          }
        </Route>
        <Route exact path="/login">
          { !user.username ?
          <SignIn setUser={setUser}></SignIn> 
          : <Redirect to="/home"/>
           }
        </Route>
        <Route exact path="/signUp">
          <SignUp></SignUp>em
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
