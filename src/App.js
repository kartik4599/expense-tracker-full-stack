import { useEffect, useState } from "react";
import Signup from "./view/signup/Signup";
import ExpensePage from "./view/ExpensePage/ExpensePage";
import Navbar from "./view/ExpensePage/Navbar";

function App() {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) setLogin(true);
  }, []);

  const loginHandler = () => {
    // localStorage.setItem("Login", "login");
    setLogin(!isLogin);
  };

  return (
    <div className="App">
      {isLogin && <Navbar loginset={loginHandler} />}
      {!isLogin && <Signup loginset={loginHandler} />}
      {isLogin && <ExpensePage  />}
    </div>
  );
}

export default App;
