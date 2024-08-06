import React, {useState} from 'react';
import Start from "../components/HomePage/Start.jsx";
import Introduction from "../components/HomePage/Introduction.jsx";
import Welcome from "../components/HomePage/Welcome.jsx";

const HomePage = () => {
    return (
        <div className="flex flex-col flex-1 bg-gradient-to-br from-sky-100 to-green-50">
            <div className="flex flex-col items-center justify-center">
                <Welcome/>
                <Introduction/>
                <Start/>
            </div>
        </div>
    );
}
export default HomePage;
