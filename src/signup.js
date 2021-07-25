import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import "./signin.css";

import axios from 'axios';


const SignUp = ()=>{

const [Username, setUsername] = React.useState("");
const [Email, setEmail] = React.useState("");
 const [Password, setPassword] = React.useState("");
 const [userCreated,setUserCreated] = React.useState(false);
 const [Err, setErr] = React.useState(false)
 const handlesubmit = async (e)=>{
  e.preventDefault();

    const res = await axios.post(`https://znx-chat-server.herokuapp.com/api/auth/register`,{Username,Email,Password}).then(function (response) {
    setUserCreated(true)
    console.log(userCreated)
  }).catch(function (error) {
     setErr(true)
    console.log(error);
  }) 
    
  
 }

 return (
    !userCreated ? 
  <div className="home">
  <div className="home_body">
  <div className="sign_in_form_containers">
  <form className="Sign_in_form">
   <h2 className="signup">Sign Up</h2>
   <h3 style={{margin:"0",padding:"0",display:!Err? "none":"block",color:"red"}}>Email or UserName Exits</h3>
   <h3>Email</h3>
   <input className="username" onChange = {(e)=>{
      setEmail(e.target.value);
      setErr(false);
   }} type="text" placeholder="Email" />
   <h3>UserName</h3>
   <input className="username" onChange = {(e)=>{
      setUsername(e.target.value);
      setErr(false);
   }} type="text" placeholder="Username" />
   <h3>Password</h3>
   <input className="password" onChange = {(e)=>{
      setPassword(e.target.value);
   }} type="password" placeholder="Password"/>
   <button className="signin_button"type="submit" onClick={(e)=>{handlesubmit(e).then()
   }}>Sign Up</button>
   <p>have a account already? <Link style={{textDecoration:"none"}} to="/login">Sign In</Link> </p>
 </form>
 </div>
 </div>
 </div>
 : <Redirect to="/login"/>
 )
}

export default SignUp;