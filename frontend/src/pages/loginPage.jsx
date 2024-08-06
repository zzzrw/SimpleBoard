import React, {useState, useEffect} from 'react';
import Register from "../components/LoginPage/Register.jsx";
import Modifier from "../components/LoginPage/Modifier.jsx"
import Login from "../components/LoginPage/Login.jsx";

const LoginPage = () => {
    const [showRegister, setIsRegister] = useState(false);
    const [showModifier, setIsModifier] = useState(false);

    const openRegister = () => {
        setIsRegister(true)
    }

    const closeRegister = () => {
        setIsRegister(false)
    }

    const openModifier = () => {
        setIsModifier(true);
    }

    const closeModifier = () => {
        setIsModifier(false);
    }

    return (
        <div className="relative flex flex-1 bg-gradient-to-r from-blue-100 to-green-50 flex-row items-center justify-center">
            <Login openRegister={openRegister} openModifier={openModifier}/>
            <Register showRegister={showRegister} closeRegister={closeRegister}/>
            <Modifier showModifier={showModifier} closeModifier={closeModifier}/>
        </div>
    );
};

export default LoginPage;
