import React, { useState } from "react";
import { auth } from "./firebase";
import { useAuthState} from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Logout = () => {

    const [user, loading] = useAuthState(auth);

    const logout = async () => {
        await signOut(auth);
    }

    return (
        <div>
            <button onClick={logout}>Sign out</button>
        </div>
    );
}

export default Logout;
