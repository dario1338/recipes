import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from "./firebase";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const navigate = useNavigate(); 

    const register = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          );
          await updateProfile(auth.currentUser, {displayName: userName});
          console.log(user);
          navigate("/");
        } catch (error) {
          console.log(error.message);
        }
    };
    
    return (
      <div className="auth-form-container">
        <div className="register-form">
          <h3> Register User </h3>
          <input
            className="inpur-username"
            placeholder="Username..."
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            className="input-email"
            placeholder="Email..."
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <input
            className="input-password"
            placeholder="Password..."
            type="password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <button onClick={register}> Create User</button>
        </div>
      </div>
    );
}

export default Register;
