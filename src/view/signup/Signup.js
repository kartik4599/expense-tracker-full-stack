import React, { useRef, useState } from "react";
import "./login.css";

const Signup = () => {
  const [islogin, setLogin] = useState(true);

  const usernameRef = useRef();
  const loginPassRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const SignPassRef = useRef();

  const loginHandler = (e) => {
    e.preventDefault();
    const loginData = {
      username: usernameRef.current.value,
      password: loginPassRef.current.value,
    };
    console.log(loginData);
  };

  const signupHandler = (e) => {
    e.preventDefault();
    const SignUpData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: SignPassRef.current.value,
    };
    console.log(SignUpData);
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
      <form onSubmit={islogin ? loginHandler : signupHandler}>
        <h3>{islogin ? "Login" : "Sign Up"}</h3>
        {islogin && (
          <div className="loginClass">
            <label htmlFor="username">Username</label>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Email or Phone"
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
        <button>{islogin ? "Log In" : "Sign Up"}</button>
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
