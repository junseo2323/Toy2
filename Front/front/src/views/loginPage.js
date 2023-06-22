import "./loginPage.scss"

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {loginUser , user} = useContext(AuthContext);
  const [islogined, setIslogined] = useState("False");
  const navigator = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    setIslogined(loginUser(username, password));
  };

  const handleRegister = () => {
    navigator("/register");
  }

  if (user) {
    navigator("/");
  } 

  return (
    <div className="loginPage">
      <section className="login-form">
        <h1>MIRACLE</h1>
        <form onSubmit={handleSubmit}>
          <div className="int-area">
              <input type="text" name="username" id="username"
              autoComplete="off" required />
              <label>아이디</label>
          </div>
          <div className="int-area">
              <input type="password" name="password" id="password"
              autoComplete="off" required />
              <label>비밀번호</label>
          </div>
          <div className="btn-area">
            <button type="submit">로그인</button>
          </div>
        </form>
        <div className="caption">
          <button href="">비밀번호를 잊어버리셨나요?</button>
          <button onClick={handleRegister}>회원가입 </button>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
 