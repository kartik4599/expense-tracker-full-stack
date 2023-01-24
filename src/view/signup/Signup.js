import React, { useRef, useState } from "react";
import "./login.css";
import axios from "axios";
import swal from "sweetalert";

const Signup = ({loginset}) => {
  const [islogin, setLogin] = useState(true);
  const usernameRef = useRef();
  const loginPassRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const SignPassRef = useRef();

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const loginData = {
        email: usernameRef.current.value,
        password: loginPassRef.current.value,
      };
      const res = await axios.post("/auth/login", loginData);
      console.log(res.data);
      if (res.data.msg === "wrong email") {
        swal("Error", "Incorrect Your Email", "warning");
      } else if (res.data.msg === "wrong password") {
        swal("Error", "Enter the correct password", "error");
      } else {
        swal("Success", "You are logined", "success");
        localStorage.setItem("login",res.data.token);
        loginset();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signupHandler = async (e) => {
    try {
      e.preventDefault();
      const SignUpData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: SignPassRef.current.value,
      };
      const res = await axios.post("/auth/signup", SignUpData);
      if (res.data.status) {
        console.log(res.data.status);
        setLogin(true);
        swal("Success", "Account Created", "success");
      }
    } catch (e) {
      if (e.response.status === 301) {
        swal("Error", "Email Already Used", "error");
      }
    }
  };

  const toggleHandler = () => {
    console.log(islogin);
    setLogin(!islogin);
  };

  return (
    <div className="body">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="form"  onSubmit={islogin ? loginHandler : signupHandler}>
        <h3>{islogin ? "Login" : "Sign Up"}</h3>
        {islogin && (
          <div className="loginClass">
            <label htmlFor="username">Username</label>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Email "
              id="username"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              ref={loginPassRef}
              type="password"
              placeholder="Password"
              id="password"
              required
            />
          </div>
        )}
        {!islogin && (
          <div className="loginClass">
            <label htmlFor="username">Name</label>
            <input
              ref={nameRef}
              type="text"
              placeholder="full name"
              id="username"
              required
            />
            <label htmlFor="username">Email</label>
            <input
              ref={emailRef}
              type="text"
              placeholder="email id"
              id="email"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              ref={SignPassRef}
              type="password"
              placeholder="password"
              id="password"
              required
            />
          </div>
        )}
        <button className="bt">{islogin ? "Log In" : "Sign Up"}</button>
        <div className="switch">
          <span className="islogin">
            {islogin ? "don't" : "Already"} have account &#8594;
          </span>
          <input type="checkbox" onClick={toggleHandler} id="slider" />
          <span className={islogin ? "select" : "unselect"}>
            <label htmlFor="slider">toggle</label>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
