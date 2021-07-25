import { Avatar, IconButton } from '@material-ui/core'

import MoreVert from "@material-ui/icons/MoreVert";
import AttachFile from "@material-ui/icons/AttachFile"
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import ChatIcon from "@material-ui/icons/Chat";
import React from 'react'
import './chat.css'
import axios from 'axios';
import {useMediaQuery} from "./hook"
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

function Chat({avatar,currentChat,user,onlineUser,chatWith,socket,setCurrentChat}) {
   
    const PORT = process.env.PORT || 5000;
    const isMobile = useMediaQuery('(max-width: 500px)');
 
  const styles = {
  container: isMobile => ({
    dispaly : isMobile ? !currentChat ?"none" :"block" : "block"
  })
};

  var count =0;
 const [Message, setMessage] = React.useState("")
 const [messages,setMessages] = React.useState()
 const [ArrivalMessage, setArrivalMessage] = React.useState(null)
 const scrollRef = React.useRef()
 const [online,setOnline] = React.useState(false)
 const [name,setName]= React.useState("")
 
 React.useEffect(()=>{
      socket?.on("getmessage",(data)=>{
     // console.log("")
      setArrivalMessage({
        sender:data.sender,
        text:data.text,
        updatedAt: Date.now()
      })
     
    })
    
 },[socket])


 React.useEffect(()=>{ 
      ArrivalMessage && chatWith===ArrivalMessage.sender && setMessages([...messages,ArrivalMessage])
 },[ArrivalMessage])

 const sendMessage = async () =>{

      socket?.emit("send",{
        sender:user._id,recevierId:chatWith,text:Message,
      })

      const sender = user._id
      const text = Message;
      const messageId=currentChat;
      const res = await axios.post(`https://znx-chat-server.herokuapp.com/api/message`,{
       messageId ,sender,text
      })

      
      
      setMessages([...messages,res.data])

 }

 React.useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior : "smooth"})
 },[messages])

 React.useEffect(async ()=>{
  
  if(currentChat)
  {
  try{
    const res = await axios.get(`https://znx-chat-server.herokuapp.com/api/message/${currentChat}`)
    setMessages(res.data)

    const response = await axios.get(`https://znx-chat-server.herokuapp.com/api/user/${chatWith}/username`)
   setName(response.data)
    
    setOnline(onlineUser?.find(user=>user.userId === chatWith))
    

  }catch(err)
  {
    console.log(err)
  }
 }
 },[currentChat,onlineUser])

 

  return (currentChat ?
  <div className="chat" style={{dispaly : !isMobile ? "block" : !currentChat ?"none" :"block"}}>
   <div className="chat_header">
      <IconButton onClick={()=>{
        setCurrentChat(null)
      }}>
     <KeyboardBackspaceIcon style={{display : !isMobile ? "none":"block"}}/>
     </IconButton>
    <Avatar src={`https://i.pravatar.cc/150? u=${avatar}`}></Avatar>
    <div className="chat_header_info">
     <h3>{name}</h3>
     <p>{online ? "online" : "offline"}</p>
    </div>
    <div className="chat_headerRight">
     <IconButton>
      <SearchOutlined></SearchOutlined>
     </IconButton>
     <IconButton>
      <AttachFile></AttachFile>
     </IconButton>
     <IconButton>
      <MoreVert></MoreVert>
     </IconButton>
    </div>
   </div>
   <div className="chat_body">
    {messages?.map((message)=>{
      var dt = new Date(message.updatedAt)
      var timestamp = dt.getHours().toString().padStart(2, '0')+ ":" + dt.getMinutes().toString().padStart(2, '0');
      
      

      var sender = false;

      if(message.sender===user._id)
      sender=true;
      return (<div key={message._id}>
      <div ref={scrollRef} >
   <p className={`chat_message ${ sender&&'chat_reciever'}`}>
     {`${message.text}`}
    <span className="timestamp">{`${timestamp}`}</span>
   </p></div></div>)
    })}
   </div>
   
   <div className="chat_footer">
    <InsertEmoticonIcon></InsertEmoticonIcon>
    <form onSubmit={(e)=>{
     e.preventDefault();
    }}>
     <input onKeyDown={(e)=>{
      if(e.code==="Enter")
      {
        sendMessage();
        setMessage("");
      }
     }} 
     onChange={(e)=>{
      setMessage(e.target.value); 
     }}
     placeholder="Type a message" type="text" value={Message}/>
     <IconButton onClick={(e)=>{
       e.preventDefault()
       sendMessage();
        setMessage("");
     }}>
      <SendIcon></SendIcon>
     </IconButton>
    </form>
    <MicIcon></MicIcon>
   </div>
  </div>
 : <div className="NoChat" style={{display : !isMobile ? "flex" : "none" }}>
   <ChatIcon id="nochat"></ChatIcon>
   <h2>Click to open a chat</h2>
 </div>
  )
}

export default Chat
