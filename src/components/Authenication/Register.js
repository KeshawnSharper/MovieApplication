import React, { Component,state, useState,useEffect } from "react";
import "./Register.css";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";
import {Circles} from "react-loader-spinner";
import {
  getUser
} from "../../actions/actions";
import { connect } from "react-redux";
function Register (props) {
  useEffect(() => {
    alert("if you dont want to register use the following credentials to see the demo... {Email: dummy@email.com,Password: p@sSword101}")
  },[])
  const [user,setUser] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    password: "",
    re_password:"",
    email: "",
    picture:
      "https://res.cloudinary.com/di449masi/image/upload/v1607974203/avatar-icon-design-for-man-vector-id648229986_cpib40.jpg"
    
    })
    const navigate = useNavigate()
   
      const [loading,setLoading] = useState(false)
      const [error,setError] = useState({message:""})
  const handleChange = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
      })
    }
  
  const handleSubmit = () => {
    console.log(user)
    if (!Object.keys(user).every(prop => user[prop] !== "")){
      return setError({...error,message:"Please Fill all fields"})
    }
    if (user.re_password !== user.password){
      return setError({...error,message:"Passwords don't match"})
    }
    setLoading(true)
    axios
      .post("https://us-central1-movieappfunctions1.cloudfunctions.net/expressApi/register", user)
      .then((res) => {
        console.log("register successful",res)
        axios.post(`https://us-central1-movieappfunctions1.cloudfunctions.net/expressApi/login`, {"email":user.email,"password":user.password}).then((res) => {
        setLoading(false)
        localStorage.setItem(`token`, res.data.token);
        localStorage.setItem(`id`, res.data.user.id);
        localStorage.setItem(`email`, res.data.user.email);
        console.log(res.data)
        localStorage.setItem(`user`, JSON.stringify(res.data));
        navigate("/home");
        window.location.reload(false);
      }).catch(err => {
        console.log(err)
      })
      })
      .catch(err => {
        console.log(err)
        setError({...error,message:err.response.data.message})
        setLoading(false)
        console.log(error)
    })
  }
    // componentDidMount() {
    //   
    // }

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
        <h2 style={{ color: "white"}}>Register</h2>
        <p style={{ color: "red","marginBottom":"20px"  }}>{error.message !== "" ? error.message : null}</p>
        <form>
          <div className="user-box">
            <input
              type="text"
              name="user_name"
              onChange={(e) => handleChange(e)}
              value={user.user_name}
              required
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="first_name"
              onChange={(e) => handleChange(e)}
              value={user.first_name}
              required
            />
            <label>First Name</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="last_name"
              onChange={(e) => handleChange(e)}
              value={user.last_name}
              required
            />
            <label>Last Name</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="email"
              onChange={(e) => handleChange(e)}
              value={user.email}
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              onChange={(e) => handleChange(e)}
              name="password"
              value={user.password}
              required
            />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              onChange={(e) => handleChange(e)}
              value={user.re_password}
              name="re_password"
              required
            />
            <label>Confirm Password</label>
          </div>

          <button type="button" className="loginButton" onClick={() => handleSubmit()}>
            Register
          </button>

          <div style={{ display: "inline-flex" }}></div>
        </form>
        <br />

        <h2>
          <Link style={{ color: "white", textDecoration: "none" }} to="/login">
            Login here
          </Link>
        </h2>
      </div>
  }
  </>
    );
  
}

export default Register;
