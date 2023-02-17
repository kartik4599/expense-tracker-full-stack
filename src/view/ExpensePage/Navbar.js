import React from "react";
import "./navbar.css";
import swal from "sweetalert";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";

const Navbar = ({ loginset, isPremium, premiumHandler }) => {
  const navigate = useNavigate();
  const Razorpay = useRazorpay();

  const logoutHandler = () => {
    swal({
      title: "Are you sure you want to logout ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((islogout) => {
      if (islogout) {
        swal("Your account is logged out", {
          icon: "success",
        });
        localStorage.removeItem("login");
        loginset();
      }
    });
  };

  const paymentHandler = async () => {
    // try {
    //   const sendData = {
    //     amount: "100",
    //     currency: "INR",
    //     receipt: "premium",
    //   };
    //   const res = await axios.post("/premium/payment", sendData, {
    //     headers: { auth: localStorage.getItem("login") },
    //   });

    //   console.log(res.data);

    //   const options = {
    //     key: res.data.key_id,
    //     amount: res.data.amount,
    //     currency: "INR",
    //     name: "Kartik Mendu",
    //     description: "Test Transaction",
    //     image: "https://example.com/your_logo",
    //     order_id: res.data.id,
    //     handler: function (response) {
    //       axios.post("/paymentrecive", response);
    //       alert(response.razorpay_payment_id);
    //       alert(response.razorpay_order_id);
    //       alert(response.razorpay_signature);
    //     },
    //     prefill: {
    //       name: "Piyush Garg",
    //       email: "youremail@example.com",
    //       contact: "9999999999",
    //     },
    //     notes: {
    //       address: "Razorpay Corporate Office",
    //     },
    //     theme: {
    //       color: "#3399cc",
    //     },
    //   };
    //   const rzpay = new Razorpay(options);
    //   rzpay.open();
    //   rzpay.on("payment.failed", (res) => {
    //     swal(res.error.description);
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
    console.log(localStorage.getItem("login"));
    const finalres = await axios.post(
      "/premium/recive",
      { premium: true },
      {
        headers: { auth: localStorage.getItem("login") },
      }
    );
    console.log(finalres);
    premiumHandler();
  };

  return (
    <nav className="navcard">
      <div>
        <span>Expense Tracker </span>
        {isPremium && <span>(Premium User)</span>}
      </div>
      <ul>
        <li
          onClick={() => {
            navigate("/");
          }}>
          Home
        </li>
        {isPremium && (
          <li
            onClick={() => {
              navigate("/report");
            }}>
            Report
          </li>
        )}
        {!isPremium && <li onClick={paymentHandler}>Premium</li>}
        <li onClick={logoutHandler}>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
