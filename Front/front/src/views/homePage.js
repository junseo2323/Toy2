import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigator = useNavigate();

  if (!user) {
    navigator("/login")
  }

  return (
    <section>
      {user && <UserInfo user={user} />}
      <h1>You are on home page!</h1>
      <button value={"LogOut"} onClick={logoutUser}>LogOut</button>
    </section>
  );
};

export default Home;
