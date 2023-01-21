import React, { useState } from "react";
import LoginForm from "./LoginForm";

const LoginComponent = ({ passmode, onSubmit }) => {
  const [mode, setMode] = useState(passmode);

  const toggleHandler = () => {
    setMode(mode === "login" ? "signup" : "login");
  };
  return (
    <div>
      <div
        className={`form-block-wrapper form-block-wrapper--is-${mode}`}></div>
      <section className={`form-block form-block--is-${mode}`}>
        <header className={`form-block__header`}>
          <h1>{mode === "login" ? "Welcome Back!" : "Sign up"}</h1>
          <div className={`form-block__toggle-block`}>
            <span>
              {mode === "login" ? "Don't" : "Already "} have an account? Click
              here &&#8594;
            </span>
            <input
              id="form-toggler"
              type={"checkbox"}
              onClick={toggleHandler}
            />
            <label htmlFor="form-toggler"></label>
          </div>
        </header>
        <LoginForm mode={mode} onSubmit={onSubmit} />
      </section>
    </div>
  );
};

export default LoginComponent;
