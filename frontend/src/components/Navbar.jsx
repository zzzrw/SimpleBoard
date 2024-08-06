import React from 'react';
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav>
            <div className="flex flex-row justify-between items-center px-10 py-4 bg-gradient-to-r from-sky-600 to-sky-100 rounded-t-lg">
                <div className="flex flex-row items-center">
                    <img src={logo} alt="logo" className="w-1/3"/>
                    <h1 className="text-2xl text-gray-100 font-bold ml-4">一个简单的看板</h1>
                </div>
                <div>
                    <ul className="flex space-x-3">
                        <li>
                            {
                                user ? (
                                    <p className="px-4 py-1 font-semibold text-gray-700">Hi, {user.username}!</p>
                                ) : (<div/>)
                            }
                        </li>
                        <li>
                            <Link to="/"
                                  className="hover:underline text-xl text-gray-600 px-4 py-1 font-semibold hover:text-gray-800">首页</Link>
                        </li>
                        <li>
                            {!user ? (
                                    <Link to="/login"
                                          className="hover:underline text-xl text-gray-600 px-4 py-1 font-semibold hover:text-gray-800">登录/注册</Link>
                                )
                                : (
                                    <button onClick={logout}
                                            className="hover:underline text-xl text-gray-600 px-4 font-semibold hover:text-gray-800">登出</button>
                                )
                            }
                        </li>
                        <li>
                            <a href="https://github.com/zzzrw/SimpleBoard"
                               className="hover:underline text-xl text-gray-600 px-4 py-1 font-semibold hover:text-gray-800">项目主页</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;