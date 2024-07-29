import React, {useState} from 'react';
import axios from "axios";
import loginImage from '../assets/login.png';
import logo from '../assets/logo.png';
import {Link} from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userData = {
        username:username,
        password:password
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

        console.log('Username:', username);
        console.log('Password:', password);
        try {
            const response = await axios.post('http://127.0.0.1:7001/api/login', userData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div
            className="flex bg-gradient-to-r from-blue-100 to-green-50 flex-row items-center min-h-screen justify-center">
            <div className="flex bg-gray-50 rounded-md shadow-lg py-12 px-20">
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
                                className="mt-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                className="mt-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="请输入你的密码"
                                required
                            />
                        </div>
                        <div className="flex justify-center text-center w-full">
                            <button onClick={handleSubmit} className="w-full mt-10 py-2 border border:bg-blue-100 bg-blue-500 text-gray-50 rounded-lg hover:bg-blue-600">登录</button>
                        </div>
                        <hr className="mt-2 border-gray-400"></hr>
                        <div className="mt-6">
                            <Link to="/login" className="font-semibold">没有账号？点此注册</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
