import React, {useEffect, useRef, useState} from 'react';
import {useAuth} from '../context/AuthContext.jsx';
import {Navigate} from "react-router-dom";
import AddProjectForm from "../components/Boardpage/AddProjectForm.jsx";
import AddProjectButton from "../components/Boardpage/AddProjectButton.jsx";
import axios from "axios";
import Projects from "../components/Boardpage/Project/Project.jsx"

const BoardPage = () => {
    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/login"/>
    }
    const id = user.id;
    const [showForm, setShowForm] = useState(false);
    const [projects, setProjects] = useState([]);

    const getProjects = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:7001/api/projects?userID='+id);
            setProjects(response.data.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);


    return (
        <div className="flex flex-1 flex-col bg-gradient-to-br from-sky-400 to-sky-200">
            <div className="flex flex-row gap-8 p-8 overflow-x-auto flex-1">
                <Projects projects={projects} getProjects={getProjects}/>
                {showForm ? (
                    <AddProjectForm getProjects={getProjects} onCancel={() => setShowForm(false)}/>
                ) : (
                    <AddProjectButton onOpen={() => setShowForm(true)}/>
                )}
            </div>
        </div>
    );
}

export default BoardPage;