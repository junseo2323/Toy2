import "./homePage.scss"

import { useContext, useEffect , useState} from "react";
import UserInfo from "../components/UserInfo";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import Miracle from "../components/Miracle";
import Setting from "../components/Setting";

const Home = () => {
  const { user, logoutUser,wtime } = useContext(AuthContext);
  const navigator = useNavigate();

  if (!user) {
    navigator("/login");
  }  

  return (
    <div className="homePage">
        {(wtime==="None") ? <Setting /> : <Miracle />}
      <section className="info-area">
        <UserInfo />
      </section>
    </div>
  );
};

export default Home;



