import React from 'react';

import './SidebarChat.css';
import {Avatar, IconButton} from "@material-ui/core";
import axios from "axios"

function SidebarChat({addNewChat,setAvatar,id,user,setCurrentChat,convId,setChatWith,socket,setRooms,rooms}) {
  const PORT = process.env.PORT || 5000;
  const [dice, setDice] = React.useState("1");
  const [name,setName] = React.useState("");
  React.useEffect(async()=>{
  
    
    if(id)
    {
      if(id[1]===user._id)
      {
        
        const response = await axios.get(`https://znx-chat-server.herokuapp.com/api/user/${id[0]}/username`)
        setName(response.data);
     
      }
    else
    {
     
     const response1 = await axios.get(`https://znx-chat-server.herokuapp.com/api/user/${id[1]}/username`)
      setName(response1.data);
    }
    }

  },[id])

 const createChat = async ()=>{
   const UserName = prompt("please enter Username");
   var UserId = user._id
   console.log(UserId)
   if(UserName)
   {
    const res = await axios.post(`https://znx-chat-server.herokuapp.com/api/chat/${UserName}`,{UserId}).then(function (response) {
        
        setRooms([...rooms,response.data])
       
       
  })
  .catch(function (error) {
     alert(error.response.data)
  }) 
   }

 }
 
 

 React.useEffect(() => {
    setDice(Math.floor(200*Math.random()))
   // console.log(dice)
 }, [])

 
 return (
  !addNewChat ? (
  <div className="SidebarChat" onClick={()=>{
    setAvatar(dice);
    setCurrentChat(convId);
    if(id)
    {
    if(id[1]==user._id)
    setChatWith(id[0])
    else
    setChatWith(id[1])
    }
  }}>
    <IconButton>
   <Avatar src={`https://i.pravatar.cc/150?u=${dice}`} ></Avatar>
   </IconButton>
   <div className="sidebarChat_info">
    <h2>{name}</h2>
   </div>
  </div>) : (
   <div className="SidebarChat" onClick={createChat}>
    <h2>Add New Chat</h2>
   </div>
  )
 )
}

export default SidebarChat
