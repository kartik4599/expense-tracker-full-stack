import { useEffect, useState } from "react";
import Signup from "./view/signup/Signup";
import ExpensePage from "./view/ExpensePage/ExpensePage";
import Navbar from "./view/ExpensePage/Navbar";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./view/signup/ForgotPassword";

function App() {
  const [isLogin, setLogin] = useState(false);
  const [isPremium, setPremium] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const login = localStorage.getItem("login");
      if (login) setLogin(true);
      const res = await axios.get("/premium/isPremium", {
        headers: { auth: localStorage.getItem("login") },
      });
      if (res.data.status) {
        setPremium(true);
      }
    };
    fetchData();
  }, []);

  const loginHandler = () => {
    setLogin(!isLogin);
  };

  const premiumHandler = () => {
    setPremium(true);
  };
  return (
    <div className="App">
      {isLogin && (
        <Navbar
          premiumHandler={premiumHandler}
          isPremium={isPremium}
          loginset={loginHandler}
        />
      )}
      <Routes>
        {!isLogin && (
          <Route path="/" element={<Signup loginset={loginHandler} />} />
        )}
        {!isLogin && (
          <Route
            path="/forgot"
            element={<ForgotPassword loginset={loginHandler} />}
          />
        )}
        {!isLogin && <Route path="*" element={<Navigate to="/" replace />} />}
        {isLogin && (
          <Route path="/" element={<ExpensePage isPremium={isPremium} />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
