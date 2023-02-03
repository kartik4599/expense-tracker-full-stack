import { useEffect, useState } from "react";
import Signup from "./view/signup/Signup";
import ExpensePage from "./view/ExpensePage/ExpensePage";
import Navbar from "./view/ExpensePage/Navbar";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./view/signup/ForgotPassword";
import Report from "./view/ExpensePage/Report";

function App() {
  const [isLogin, setLogin] = useState(false);
  const [isPremium, setPremium] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const login = localStorage.getItem("login");
      if (login) setLogin(true);

      const count = await axios.get("/getExpenseCount", {
        headers: { auth: localStorage.getItem("login") },
      });
      console.log(count.data);
      const number = Math.ceil(count.data / 5);
      console.log(number);
      setTotalCount(number);

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
          <>
            <Route path="/" element={<Signup loginset={loginHandler} />} />
            <Route
              path="/forgot"
              element={<ForgotPassword loginset={loginHandler} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
        {isLogin && (
          <>
            <Route
              path="/"
              element={
                <ExpensePage isPremium={isPremium} totalCount={totalCount} />
              }
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
