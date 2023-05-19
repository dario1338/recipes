import React, {useState, useEffect} from "react";
import { onAuthStateChanged,
signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    
    }, [])

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="auth-form-container">
                <div className="login-form">
                    <h3>Login</h3>
                    <input className="input-email" placeholder="Email:" onChange={(event) => {setLoginEmail(event.target.value);}} />
                    <input className="input-password" placeholder="Password:" type="password" onChange={(event) => {setLoginPassword(event.target.value);}} />
                    <button className="login-button" onClick={login}>Login</button>
                </div>
        </div>
    );
}

export default Login;
