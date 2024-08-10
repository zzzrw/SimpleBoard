import react, {useState} from "react";
import React from "react";

const Task = ({tasks}) => {
    const [showDelete, setShowDelete] = useState(false);

    return (
        <div>
            {tasks ? (tasks.map(task => (
                <button key={task.id}
                        className="flex flex-row w-full mb-2.5 p-2 bg-gray-50 rounded-2xl shadow-sm justify-between border border-gray-300 text-gray-600 hover:border-2 hover:border-blue-500">
                    <p className="text-sm p-0.5">{task.title}</p>
                    {showDelete[task.id] ? (<button className="hover:bg-gray-300 rounded-full"> &times; </button>) : (
                        <div></div>)}
                </button>
            ))) : (<></>)}
        </div>);
}

export default Task;