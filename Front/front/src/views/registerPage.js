import "./registerPage.scss"
import { useState, useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const {loginUser, registerUser } = useContext(AuthContext);
  const navigator = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, email, nickname, password, password2);
    navigator("/login");
  };

  return (
    <div className="registerPage">
      <section className="register-form">
        <form onSubmit={handleSubmit}>
          <h1>회원가입</h1>
          <div className="int-area">
            <input
              type="text"
              id="username"
              onChange={e => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">아이디</label>
          </div>
          <div className="int-area">
            <input
              type="text"
              id="nickname"
              onChange={e => setNickname(e.target.value)}
              required
            />
            <label htmlFor="nickname">닉네임</label>
          </div>
          <div className="int-area">
            <input
              type="email"
              id="email"
              onChange={e=>{setEmail(e.target.value);}}
              required
            />
            <label htmlFor="email">이메일</label>
          </div>
          <div className="int-area">
            <input
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">비밀번호</label>
          </div>
          <div className="int-area">
            <input
              type="password"
              id="confirm-password"
              onChange={e => setPassword2(e.target.value)}
              required
            />
            <label htmlFor="confirm-password">비밀번호 확인</label>
            <p>{password2 !== password ? "비밀번호가 일치하지 않습니다" : ""}</p>
          </div>
          <div className="btn-area">
            <button>회원가입</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;
