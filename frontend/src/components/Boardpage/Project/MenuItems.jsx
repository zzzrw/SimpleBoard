import React from "react";

const MenuItems = ({onOpenAddTaskForm, onDeleteTask, onDeleteProject}) => {
    return (
        <div className="relative">
            <div className="absolute right-2 top-12 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <button
                    onClick={onOpenAddTaskForm}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                >
                    添加任务
                </button>
                <button
                    onClick={onDeleteTask}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                >
                    删除任务
                </button>
                <button
                    onClick={onDeleteProject}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                >
                    删除项目
                </button>
            </div>
        </div>
    )
}

export default MenuItems;