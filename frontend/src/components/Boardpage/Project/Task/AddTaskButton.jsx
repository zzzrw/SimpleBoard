import React from "react";

const AddTaskButton = ({onOpen}) => {
    return (<button
        onClick={onOpen}
        className="w-full"
    >
        <div className="flex hover:bg-gray-200 space-x-2 rounded-lg py-0.5 items-center">
            <h1 className="text-gray-600 text-lg font-semibold">+</h1>
            <p className="text-gray-600 text-sm ">添加任务</p>
        </div>
    </button>)
}
export default AddTaskButton;