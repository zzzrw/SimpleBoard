import React, {useState} from 'react';
import axios from "axios";
import loginImage from '../assets/login.png';
import logo from '../assets/logo.png';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";
import Register from "../components/Register.jsx";
import Modifier from "../components/Modifier.jsx"

const LoginPage = () => {
    const {isAuthenticated, login} = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showRegister, setIsRegister] = useState(false);
    const [showModifier, setIsModifier] = useState(false);

    const userData = {
        username: username,
        password: password
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username) {
            alert('请输入您的用户名');
            return;
        }

        if (!password) {
            alert('请输入您的密码');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:7001/api/login', userData);
            if (response.data.success) {
                login()
                navigate('/home')
            } else {
                alert('账户名或密码错误')
            }
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div
            className="relative flex bg-gradient-to-r from-blue-100 to-green-50 flex-row items-center justify-center">
            <div className="flex bg-gray-50 rounded-lg shadow-lg py-8 px-16 my-8">
                <div className="flex flex-col w-2/3">
                    <img src={logo} alt="logo" className="w-1/3"/>
                    <img src={loginImage} alt="login" className="mt-8 mb-32 w-1-2"/>
                </div>
                <div className="flex flex-col w-1/3 mt-36">
                    <h1 className="text-5xl font-mono font-bold">登录</h1>
                    <form>
                        <div className="mt-10">
                            <label htmlFor="username" className="text-xl font-serif font-bold">用户名</label>
                            <input
                                type="text"
                                id="username"
                                className="mt-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="请输入你的用户名"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="text-xl font-serif font-bold">密码</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                                placeholder="请输入你的密码"
                                required
                            />
                        </div>
                        <div className="flex justify-center text-center w-full">
                            <button onClick={handleSubmit}
                                    className="w-full mt-10 py-2 border border:bg-blue-100 bg-blue-500 text-gray-50 rounded-lg hover:bg-blue-600">登录
                            </button>
                        </div>
                        <hr className="mt-2 border-gray-400"></hr>
                    </form>
                    <div className="flex mt-6 justify-between">
                        <button onClick={openRegister}
                                className="text-gray-600 font-semibold underline hover:text-gray-900">没有账号？点此注册
                        </button>
                        <button onClick={openModifier}
                                className="text-gray-600 font-semibold underline hover:text-gray-900">忘记密码
                        </button>
                    </div>
                </div>
            </div>
            <Register showRegister={showRegister} closeRegister={closeRegister}/>
            <Modifier showModifier={showModifier} closeModifier={closeModifier}/>
        </div>
    );
};

export default LoginPage;
