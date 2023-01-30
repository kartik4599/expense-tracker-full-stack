import axios from "axios";
import React, { useRef } from "react";
import swal from "sweetalert";

const ForgotPassword = () => {
  const usernameRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const sendData = {
      email: usernameRef.current.value,
    };
    console.log(sendData);
    const res = await axios.post("/auth/forgot", sendData);
    if (res.data.status === "done") {
      swal("Check Your Reset link in Email ");
    }
  };

  return (
    <div className="body">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="form" onSubmit={submitHandler}>
        <h3>Forgot Password</h3>
        <div className="loginClass">
          <label htmlFor="username">Username</label>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Enter your email"
            id="username"
            required
          />
        </div>
        <button className="bt">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
