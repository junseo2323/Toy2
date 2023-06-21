import React, { useState } from 'react';
import UserInfo from '../components/UserInfo';
import { useContext } from 'react';
import { AuthContext } from "../App";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    return(
        <div>
            ProfilePage
            <UserInfo user={user}/>
        </div>
    )
}

export default ProfilePage;