import {Link} from "react-router-dom";
import React from "react";
import {useAuth} from "../../context/AuthContext.jsx";

const Start = () => {
    const { user } = useAuth();

    return (
        <Link to={!user ? ("login") : ("/board")}
           className="mb-4 border border-blue-100 bg-sky-500 rounded-full shadow-lg hover:border-transparent hover:bg-sky-600 text-4xl text-white px-16 py-6 font-semibold font-serif">开始使用
        </Link>
    )
}

export default Start;