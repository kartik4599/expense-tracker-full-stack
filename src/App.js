import { useEffect, useState } from "react";
import Signup from "./view/signup/Signup";
import ExpensePage from "./view/ExpensePage/ExpensePage";
import Navbar from "./view/ExpensePage/Navbar";
import axios from "axios";

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

  const premiumHandler=()=>{
    setPremium(true);
  }
  return (
    <div className="App">
      {isLogin && <Navbar premiumHandler={premiumHandler} isPremium={isPremium} loginset={loginHandler} />}
      {!isLogin && <Signup loginset={loginHandler} />}
      {isLogin && <ExpensePage isPremium={isPremium} />}
    </div>
  );
}

export default App;
