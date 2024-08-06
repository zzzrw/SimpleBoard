import logo from "../../assets/logo.png";
import loginImage from "../../assets/login.png";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const Login = ({openRegister, openModifier}) => {
    const {login} = useAuth();
    const [loginSuccess, setUserSuccess] = useState(false);

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userData = {
        username: username,
        password: password
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await login(userData);

        if (!res){
            alert('用户名或密码错误');
        }
        else{
            alert('登录成功');
        }
        await setUserSuccess(res);
    };

    useEffect(() => {
        if (loginSuccess) {
            navigate('/board');
        } else{

        }}, [loginSuccess]
    );

    return (
        <div className="flex bg-gray-50 rounded-lg shadow-lg pt-6 pb-4 px-20 my-6">
            <div className="flex flex-col w-2/3">
                <img src={logo} alt="logo" className="w-1/3"/>
                <img src={loginImage} alt="login" className="mt-8 mb-32 w-1-2 mr-4"/>
            </div>
            <div className="flex flex-col w-1/3 mt-36">
                <h1 className="text-5xl font-mono font-bold">登录</h1>
                <form onSubmit={handleSubmit}>
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
                        <button
                            type="submit"
                            className="w-full mt-10 py-2 border border:bg-blue-100 bg-blue-500 text-gray-50 rounded-lg hover:bg-blue-600">登录
                        </button>
                    </div>
                    <hr className="mt-2 border-gray-400"></hr>
                </form>
                <div className="flex mt-6 justify-between">
                    <button
                        type="button"
                        onClick={openRegister}
                        className="text-gray-600 font-semibold underline hover:text-gray-900">没有账号？点此注册
                    </button>
                    <button
                        type="button"
                        onClick={openModifier}
                        className="text-gray-600 font-semibold underline hover:text-gray-900">忘记密码
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;