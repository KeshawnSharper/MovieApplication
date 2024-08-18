import React, { Component,useEffect,useState} from "react";
import "./Login.css";
import { Link,useNavigate } from "react-router-dom";
import Google from "../GoogleAuth/Google";
import axios from "axios";
import {Circles} from "react-loader-spinner";
function Login (props){
  useEffect(() => {
    alert("if you dont want to register use the following credentials to see the demo... {Email: dummy@email.com,Password: p@sSword101}")
  },[])
      const [isGoogleValidated,setIsGoogleValidated] = useState(false)
     const [isFacebookValidated,setIsFavorite] = useState(false)
      const [googleUser,isGoogleUser] = useState({}) 
      const [facebookUser,setFacebook] = useState({})
      const [user,setUser] =  useState({})
      const [loading,setLoading] = useState(false)
      const [error,setError] = useState({"message":""})
      const navigate = useNavigate()
    


  const handleChange = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
      })
  }
  const login = () => {
    setLoading(true)
    console.log(user)
    axios
      .post(`https://us-central1-movieappfunctions1.cloudfunctions.net/expressApi/login`, user)
      .then((res) => {
        setLoading(false)
        console.log(res,"res")
        console.log("user",res.data)
        localStorage.setItem(`token`, res.data.token);
        localStorage.setItem(`id`, res.data.user.id);
        localStorage.setItem(`email`, res.data.user.email);
        localStorage.setItem(`user`, JSON.stringify(res.data.user));
        navigate("/home");
        window.location.reload(false);
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setError({...error,message:err.response.data.message})
        setLoading(false)
      })
  };
  const submitGoogleUser = (user) => {
              axios.post(`https://pakkpcfd88.execute-api.us-east-2.amazonaws.com/default/movie-application-be/loginGoogle/google_${JSON.parse(localStorage.getItem("google_temp_user")).googleId}`,JSON.parse(localStorage.getItem("google_temp_user")))
                .then((res) => {
                  localStorage.setItem(`id`, res.data.id);
                  localStorage.setItem(`token`, res.data.token);
                  localStorage.setItem("user",JSON.stringify(res.data))
                  navigate("/home");
                  window.location.reload(false);
                })
                .catch(err => console.log(err))
           
        } 
 

  const submitFacebookUser = (user) => {
    console.log("hi")
    if (localStorage.getItem("Facebook_Temp_User")){
   axios.post(`https://pakkpcfd88.execute-api.us-east-2.amazonaws.com/default/movie-application-be/loginFacebook/Facebook_${JSON.parse(localStorage.getItem("Facebook_Temp_User")).id}`,JSON.parse(localStorage.getItem("Facebook_Temp_User")))
   .then(res => {
console.log()
    localStorage.setItem("user",res.data)
    // this.props.history.push("/home");
    // window.location.reload(false);
  })
    }
  }

    return (
      <>
      {
      loading ?
        (
      <div style={{"background":"black","margin":"0 auto"}}>
    <Circles style={{"margin":"0 auto","textAlign":"center"}}type="Puff" color="#00BFFF" /> 
    <h2 style={{"color":"white","textAlign":"center"}}>Authenicating</h2>
    </div>
        )
        :
      <div className="login-box">
        <h2>Login</h2>
        <p style={{ color: "red","marginBottom":"20px"  }}>{error.message !== "" ? error.message : null}</p>
        <form>
          <div className="user-box">
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="email"
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              required
            />
            <label>Password</label>
          </div>
          <button type="button" className="loginButton" onClick={() => login()}>
            
            Login
          </button>
          <br />
          <br />
          {/* <p style={{"color":"white","width":"100%"}}> (May need to clear browsing data, cache and/or allow popups to sign in with Google)</p>
<br />
          <div style={{ display: "inline-flex" }}>
            <Google  SubmitGoogleUser={() => this.SubmitGoogleUser()} /> */}
            {/* Removing the Facebook login until I find a way for it to not login on render */}
            {/* <Facebook SubmitFacebookUser={() => this.SubmitFacebookUser()} /> */}
          {/* </div> */}
          <br />
        </form>
        <br />
        <h2>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/register"
          >
            Register here
          </Link>
        </h2>
      </div>
      }
      </>
    );
  
    }

export default Login
