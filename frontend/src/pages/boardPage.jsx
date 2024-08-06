import React, {useState} from 'react';
import {useAuth} from '../context/AuthContext.jsx';
import {Navigate} from "react-router-dom";
import AddProjectForm from "../components/Boardpage/AddProjectForm.jsx";
import AddProjectButton from "../components/Boardpage/AddProjectButton.jsx";

const BoardPage = () => {
    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/login"/>
    }

    const [showForm, setShowForm] = useState(false);

    const projects = [
        {
            id: 1,
            name: 'Project 1',
            tasks: [
                {id: 1, name: 'Task 1.1'},
                {id: 2, name: 'Task 1.2'},
            ],
        },
        {
            id: 2,
            name: 'Project 2',
            tasks: [
                {id: 3, name: 'Task 2.1'},
                {id: 4, name: 'Task 2.2'},
            ],
        },
    ];
    return (
        <div className="flex flex-1 flex-col bg-gradient-to-br from-sky-400 to-sky-200">
            <div className="flex flex-wrap gap-8 p-8">
                {projects.map(project => (
                    <div key={project.id}
                         className="h-fit w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-4 bg-gray-100 rounded-2xl shadow-xl">
                        <h2 className="text-md font-bold mb-4 mt-1.5">{project.name}</h2>
                        <div className="space-y-4">
                            {project.tasks.map(task => (
                                <div key={task.id} className="p-3 bg-white rounded-2xl drop-shadow-lg">
                                    <p className="text-sm">{task.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {!showForm ? (
                    <AddProjectButton setShowForm={setShowForm}/>
                ) : (
                    <AddProjectForm onAdd={() => setShowForm(true)} onCancel={() => setShowForm(false)}/>
                )}
            </div>
        </div>
    );
}

export default BoardPage;