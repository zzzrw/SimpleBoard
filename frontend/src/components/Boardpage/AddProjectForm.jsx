import react, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.jsx";

const AddProjectForm = ({getProjects, onCancel}) => {
    const [projectName, setProjectName] = useState('');
    const {user} = useAuth();
    const formRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:7001/api/createProject', {
                name: projectName,
                userID: user.id
            });
            if (response.data.success) {
                onCancel();
                getProjects();
                setProjectName('');
            }
        } catch (e) {
            console.error(e);
        }
    };


    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            onCancel();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="form-container flex min-w-60 h-fit" ref={formRef}>
            <form onSubmit={handleSubmit}
                  className="flex flex-col space-y-4 p-4 border rounded-xl bg-gray-100 shadow-lg w-full">
                <input
                    type="text"
                    placeholder="请输入项目名称"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="p-2 border rounded text-sm"
                    required
                />
                <div className="flex space-x-2">
                    <button type="submit"
                            className="bg-blue-500 text-white px-2 py-1 rounded-xl hover:bg-blue-700">添加项目
                    </button>
                    <button type="button" onClick={onCancel}
                            className="text-gray-800 text-2xl hover:bg-gray-200 px-1 rounded-lg"> &times; </button>
                </div>
            </form>
        </div>
    );
};

export default AddProjectForm;
