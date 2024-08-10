import {useState} from "react";
import axios from "axios";

const AddTaskForm = ( {projectID, onCancel, getTask} ) => {
    const [taskName, setTaskName] = useState("")

    const handleTaskSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title:taskName,
            projectID:projectID
        }
        try {
            const response = await axios.post('http://127.0.0.1:7001/api/createTask', data);
            if (response.data.success){
                onCancel();
                getTask();
                setTaskName('');
            }
        }catch (e){
            console.error(e);
        }
    }

    return (
        <form onSubmit={handleTaskSubmit}>
            <input
                type="text"
                placeholder="请输入任务名称"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="px-2 pt-2 pb-6 border rounded text-sm w-full"
                required
            />
            <div className="flex space-x-2 mt-2">
                <button type="submit"
                        className="bg-blue-500 text-white px-2 py-1 rounded-xl hover:bg-blue-700">添加任务
                </button>
                <button type="button" onClick={onCancel}
                        className="text-gray-800 text-2xl hover:bg-gray-200 px-1 rounded-lg"> &times; </button>
            </div>
        </form>
    )
}
export default AddTaskForm;