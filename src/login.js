import React from 'react';
import { Link } from 'react-router-dom';
import "./signin.css";

import axios from "axios";
import { Redirect } from 'react-router';

const SignIn = ({setUser})=>{

   
const [Username, setUsername] = React.useState("");
 const [password, setPassword] = React.useState("");
 const [loggedin,setLoggedIn] = React.useState(false)
 const [Err, setErr] = React.useState(false)
 const handlesubmit = async (e)=>{
  e.preventDefault();
 const loginUser = await axios.post(`https://znx-chat-server.herokuapp.com/api/auth/login`,{
     email:Username,password
  })
  .then(function (response) {
   
    setUser(response.data)
     setLoggedIn(true)
     sessionStorage.setItem('user', JSON.stringify(response.data));

  })
  .catch(function (error) {
     setErr(true)
    console.log(error);
  }) 
 }
 

 

 return (
    !loggedin ?
  <div className="home">
  <div className="home_body">
  <div className="sign_in_form_container">
  <form className="Sign_in_form">
   <h1>Login to Continue</h1>
   <h3 style={{margin:"0",padding:"0",display:!Err? "none":"block",color:"red"}}>Wrong Email or Password</h3>
   <h3>Email</h3>
   <input className="username" onChange = {(e)=>{
      setUsername(e.target.value);
      setErr(false)
   }} type="text" placeholder="Username" />
   <h3>Password</h3>
   <input className="password" onChange = {(e)=>{
      setPassword(e.target.value);
      setErr(false)
   }} type="password" placeholder="Password"/>
   <button className="signin_button"type="submit" onClick={(e)=>{handlesubmit(e)
   }}>Sign In</button>
   <p >Don't have a account? <Link to="/signUp">Sign Up</Link> </p>
 </form>
 </div>
 </div>
 </div>
 : <Redirect to="/home" />
 )
}

export default SignIn;