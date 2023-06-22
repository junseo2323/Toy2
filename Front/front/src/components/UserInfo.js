import "./UserInfo.scss"
import { useContext } from "react";
import { AuthContext } from "../App";

function UserInfo() {
  const {user,logoutUser,wtime,wcount} = useContext(AuthContext);
  
    return (
      <div>
        <section className="info_area">
          <div className="circle"></div>
          <h1>{user.nickname}</h1>
        </section>
        <section className="user_area">
            <div className="time_area">
                <p>기상 시간 <br /> {wtime}</p>
            </div>  
            <div className="time_area">
                <p>Counter <br /> {wcount}</p>
            </div>
            <div className="time_area">
                <p>Group <br /> {user.group}</p>
            </div>    
        </section>
        <button value={"LogOut"} onClick={logoutUser}>LogOut</button>  
      </div>
    );
  }
  
  export default UserInfo;

