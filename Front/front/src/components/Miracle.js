import React, { useState,useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../App';

const Miracle = () => {
    const [timer, setTimer] = useState("");
    const [maintimer, setMaintimer] = useState("");
    const { user, logoutUser,wtime } = useContext(AuthContext);

    let user_t = wtime;
    user_t = user_t.split(":");
    useEffect(()=>{
      const countdown = setInterval(() => {
        let today = new Date();
        let t = today.toLocaleTimeString("en-GB");
        setTimer(t.split(":"));
      },1000);
      let main_t = [0,0,0];
      for(let i=0;i <3; i++){
        main_t[i] = user_t[i] - timer[i];
      }
      setMaintimer(main_t);
      console.log(timer,user_t,main_t)
      
    },[timer]);

    return (
      <section className="home-area">
        <h1>My Miracle</h1>
        <h1>{maintimer[0] > 0 ? maintimer[0] : 24+maintimer[0]}:{(10>maintimer[1]&&maintimer[1]>0?"0":"")}{(0<=maintimer[1])?maintimer[1]:60+maintimer[1]}:{(10>maintimer[2]&&maintimer[2]>0?"0":"")}{(0<=maintimer[2])?maintimer[2]:60+maintimer[2]}</h1>
        <button>기상하기</button>
      </section>
    )
}

export default Miracle
