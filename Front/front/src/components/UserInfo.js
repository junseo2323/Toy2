function UserInfo({ user }) {
    return (
      <div>
        id : {user.username} <br/>
        email : {user.email} <br />
        awake : {user.awake}
      </div>
    );
  }
  
  export default UserInfo;

