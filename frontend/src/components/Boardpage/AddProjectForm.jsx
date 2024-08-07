import react, {useState} from "react";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.jsx";

const AddProjectForm = ({getProjects, onCancel }) => {
    const [projectName, setProjectName] = useState('');
    const { user } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:7001/api/createProject', {name: projectName, userID: user.id});
        getProjects();
        console.log(response)
        setProjectName('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 border rounded-xl bg-gray-100 shadow-lg h-fit w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
            <input
                type="text"
                placeholder="请输入项目名称"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="p-2 border rounded text-sm"
                required
            />
            <div className="flex space-x-2">
                <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-xl hover:bg-blue-700">添加项目</button>
                <button type="button" onClick={onCancel} className="text-gray-800 text-2xl hover:bg-gray-200 px-1 rounded-lg"> &times; </button>
            </div>
        </form>
    );
};

export default AddProjectForm;
