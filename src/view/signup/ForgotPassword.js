import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const ForgotPassword = () => {
  const usernameRef = useRef();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const sendData = {
        email: usernameRef.current.value,
      };
      console.log(sendData);
      const res = await axios.post("/auth/forgot", sendData);
      if (res.data.status === "done") {
        swal("Done", "Check Your Reset link in Email", "success");
        navigate("/");
      } else if (res.data.status === "email not found") {
        console.log(res.data);
        swal("Error", "Email dosen't exist", "warning");
      }else{
        swal("Error", "Some Error occured", "error");
      }
    } catch (e) {
      console.log(e);
      swal("Some Error occured");
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
