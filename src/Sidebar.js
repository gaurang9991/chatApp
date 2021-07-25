import React from 'react'
import "./sidebar.css";
import {Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutLined from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat';
import axios from "axios"
import {useMediaQuery} from './hook';


const AppSidebar=({setAvatar,user,setCurrentChat,setChatWith,currentChat,socket})=> {
  
  
  const [loaded, setLoaded] = React.useState(false)
  const [rooms, setRooms] = React.useState([{}]);
  const [dice, setDice] = React.useState("1");

   
  const isMobile = useMediaQuery('(max-width: 500px)')
  /*console.log(currentChat)*/
  
 React.useEffect(() => {
    setDice(Math.floor(200*Math.random()))
   // console.log(dice)
 }, [])

  React.useEffect(()=>{
     
     async function fetchData() {
          try
    {
        const conv = await axios.get(`https://znx-chat-server.herokuapp.com/api/chat/${user._id}`)
         await setRooms(conv.data)
         setLoaded(true);
    }
    catch(err)
    {
      console.log(err)
    }
     } fetchData();
      
  })


 return (<>
  <div className="sidebar" style={{display : !isMobile ? "flex" : !currentChat ? "flex" : "none" }}>
   <div className="sidebar_header">
     <IconButton style = {{margin : "0",padding :"0"}}>
   <Avatar src={`https://i.pravatar.cc/150?u=${dice}`}/>
   </IconButton>
   <div className="sidebar_headerRight">
     <IconButton style = {{margin : "0",padding :"0"}}>
     <DonutLargeIcon/>
     </IconButton >
     <IconButton style = {{margin : "0",padding :"0"}}>
     <ChatIcon/>
     </IconButton >
     <IconButton style = {{margin : "0",padding :"0"}}>
     <MoreVertIcon/>
     </IconButton>
   </div>
   </div>
   <div className="sidebar_search">
     <div className="sidebar_search_container">
     <SearchOutLined/>
     <input placeholder ="Search or start a new chat" type="text"></input> 
     </div>
   </div>
   <div className="sidebar_chats">
     <SidebarChat addNewChat setAvatar={setAvatar} user={user} socket={socket} setRooms={setRooms} rooms={rooms} />
     { loaded ? rooms.map((room)=>{
       return(
       <SidebarChat setAvatar={setAvatar} key={room._id} id={room.members} user={user} convId={room._id}setCurrentChat={setCurrentChat} setChatWith={setChatWith} socket={socket}></SidebarChat>) 
     }):(<div></div>) }
   </div>
  </div>
  </>
 )
}



export default AppSidebar
