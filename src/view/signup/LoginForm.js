import React from "react";

const LoginForm = ({ mode, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className={`form-bloack__input-wrapper`}>
        <div className={`form-group form-group--login`}>
          <input
            className="form-group__input"
            type={"text"}
            id={"username"}
            placeholder={"user name"}
            disabled={mode === "signup"}
          />
          <input
            className="form-group__input"
            type={"password"}
            id={"password"}
            placeholder={"password"}
            disabled={mode === "signup"}
          />
        </div>
        <div className={`form-group form-group--signup`}>
          <input
            className="form-group__input"
            type={"text"}
            id={"fullname"}
            placeholder={"full name"}
            disabled={mode === "login"}
          />
          <input
            className="form-group__input"
            type={"email"}
            id={"email"}
            placeholder={"email"}
            disabled={mode === "login"}
          />
          <input
            className="form-group__input"
            type={"password"}
            id={"createpassword"}
            placeholder={"password"}
            disabled={mode === "login"}
          />
          <input
            className="form-group__input"
            type={"password"}
            id={"repeatpassword"}
            placeholder={"repeat password"}
            disabled={mode === "login"}
          />
        </div>
      </div>
      <button
        className={`button button-primary full-width`}
        type="submit">{mode=="login"?"Log In":"Sign Up"}</button>
    </form>
  );
};

export default LoginForm;
