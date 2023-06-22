import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../App';
import "./Setting.scss"

const Setting = () => {
    const {user,setTime} = useContext(AuthContext);
    const [stime, setStime] = useState("");

    const handleSubmit = e => {
        const s = e.target.setting.value
        setTime(user.username, s);
        alert(s);
    }

    return (
        <section className="home-area">
            {stime}
            <h1>Miracle Setting</h1>
            <form onSubmit={handleSubmit}>
            <div className="time-area">
                <input type="time" name="setting" id="setting"
                required />
            </div>
            <div className="time-btn">
                <button type="submit">시간설정</button>
            </div>
            </form>
      </section>
    )
}

export default Setting