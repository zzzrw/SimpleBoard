import React from "react";

const AddProjectButton = ({onOpen}) => {
    return (<button
        onClick={onOpen}
        className="flex space-x-2 h-fit w-full min-w-60 sm:w-1/2 md:w-1/4 lg:w-1/6 p-2 bg-gray-100 rounded-xl shadow-md bg-opacity-20 hover:bg-gray-200 hover:bg-opacity-40"
    >
        <h1 className="text-white text-lg font-extrabold">+</h1>
        <p className="text-white text-md font-semibold mt-0.5">添加一个新的项目</p>
    </button>)
}

export default AddProjectButton;