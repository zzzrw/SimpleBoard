import React from 'react';
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div
                className="flex flex-row justify-between items-center px-10 py-4 bg-gradient-to-r from-sky-300 to-green-200 rounded-t-lg">
                <div className="flex flex-row items-center">
                    <img src={logo} alt="logo" className="w-1/3"/>
                    <h1 className="text-2xl  font-bold ml-4">一个简单的看板</h1>
                </div>
                <div>
                    <ul className="flex space-x-3">
                        <li>
                            <Link to="/" className="hover:underline text-xl text-gray-600 px-4 py-1 font-semibold hover:text-gray-800">首页</Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:underline text-xl text-gray-600 px-4 py-1 font-semibold hover:text-gray-800">登录/注册</Link>
                        </li>
                        <li>
                            <a href="https://github.com/zzzrw/SimpleBoard" className="hover:underline text-xl text-gray-600 px-4 py-1 font-semibold hover:text-gray-800" >项目主页</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;