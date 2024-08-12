import React, {useState} from "react";
import TaskModal from "./TaskModal.jsx";

const Task = ({projectID, tasks, deleteTask, showDelete, onTaskUpdated}) => {
    const [showTaskModal, setShowTaskModal] = useState({})

    const toggleModal = (taskID) => {
        setShowTaskModal(prev => ({
            ...prev,
            [taskID]: !prev[taskID]
        }));
    };

    return (
        <div>
            {tasks && (tasks.map(task => (
                <div>
                    <button key={task.id}
                            className="flex flex-row w-full mb-2.5 p-2 bg-gray-50 rounded-2xl shadow-sm justify-between border border-gray-300 text-gray-600 hover:border-2 hover:border-blue-500"
                            onClick={() => toggleModal(task.id)}>
                        <p className="text-sm p-0.5">{task.title}</p>
                        {showDelete ?
                            (<span onClick={() => deleteTask(projectID, task.id)}
                                   className="hover:bg-gray-300 rounded-full"> &times; </span>)
                            : (<div></div>)}
                    </button>
                    {showTaskModal[task.id] ? (<TaskModal task={task} showTaskModal={() => toggleModal(task.id)} closeTaskModal={() => toggleModal(task.id)} onTaskUpdated={onTaskUpdated}/>): (<></>)}
                </div>)))}
        </div>);
}

export default Task;