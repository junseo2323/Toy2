import React from "react";
import axios from "axios";
import dayjs from "dayjs";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import Profile from "./views/profilePage";
import useAxios from "./utils/useAxios";
import LoginPage from "./views/loginPage";

export const AuthContext = createContext(); // Context 생성

function App() {
  const [authTokens, setAuthTokens] = useState(() =>
  localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null
); // localStorage에 authTokens이 있을 경우 가져와서 authTokens에 넣는다.
const [user, setUser] = useState(() =>
  localStorage.getItem("authTokens")
    ? jwt_decode(localStorage.getItem("authTokens"))
    : null
); // localStorage에 authTokens이 있을 경우 jwt_decode로 authTokens를 decode해서 user 정보에 넣는다.
const [loading, setLoading] = useState(true);

const [wtime,setWtime] = useState(user.wake_time);
const [wcount,setWcount] = useState(user.count_wake);

const loginUser = async (username, password) => {
  console.log("로그인 함수 호출됨.")
  const response = await fetch("http://127.0.0.1:8000/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  const data = await response.json();

  // 로그인에 성공했을 경우 홈으로 이동
  if (response.status === 200) {
    console.log("로그인 성공")
    setAuthTokens(data);
    setUser(jwt_decode(data.access));
    localStorage.setItem("authTokens", JSON.stringify(data));

  } else {
    console.log("로그인 에러")
  }
};

const refreshUser = async (username) => {
  console.log("리프레시 진행중.");
  console.log(username);
  const response = await fetch("http://127.0.0.1:8000/api/refresh/"+username, {
    method: "GET"
  });
  const data = await response.json();
  setWtime(data['wake_time']);
  setWcount(data['count_wake']);
}

const registerUser = async (username,email, nickname , password, password2) => {
  console.log("회원가입 함수 호출됨.")
  
  const response = await fetch("http://127.0.0.1:8000/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      nickname,
      email,
      password,
      password2
    })
  });
  if (response.status === 201) {
    console.log("회원가입 완료");
  } else if (response.status === 400){
    console.log("회원가입 실패 - 이미 있는 아이디입니다.")
  } else {
    console.log("회원가입 실패")
  }
};

const setTime = async (username, wake_time) => {
  console.log("타임 셋팅 호출됨")
  const response = await fetch("http://127.0.0.1:8000/api/settime/"+username , {
    method: "PUT",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      wake_time,
      username
    })
  });
  if(response.status === 200){
    console.log("타임 셋팅 완료");
    refreshUser(authTokens["refresh"]);
  }
}

const logoutUser = () => {
  setAuthTokens(null);
  setUser(null);
  localStorage.removeItem("authTokens");
};

const contextData = {
  user,
  setUser,
  authTokens,
  setAuthTokens,
  registerUser, //회원가입
  loginUser, //로그인
  logoutUser,
  setTime,
  refreshUser,
  wtime,
  wcount
};

useEffect(() => {
  console.log(contextData)
  if (authTokens) {
    setUser(jwt_decode(authTokens.access));
  }
  setLoading(false);
  refreshUser(user.username);
}, [authTokens, loading]);


  return (
      <Router>
        <div>
          <AuthContext.Provider value={contextData}>
          <Routes>
              <Route path="/" element={<Home/>} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile/>}/>
          </Routes>
          </AuthContext.Provider>
          </div>
      </Router>
  );
}

export default App;
