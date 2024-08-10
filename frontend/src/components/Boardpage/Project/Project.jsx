import React, {useEffect, useState, useRef} from "react";
import AddTaskButton from "./AddTaskButton";
import AddTaskForm from "./AddTaskForm";
import MenuButton from "./MenuButton.jsx";
import axios from "axios";
import MenuItems from "./MenuItems.jsx";
import Task from "./Task/Task.jsx"

const Project = ({projects, getProjects}) => {
    const [showForms, setShowForms] = useState({});
    const [modifyName, setModifyName] = useState({})
    const [newName, setNewName] = useState({})
    const [menuItems, setMenu] = useState({})
    const formRefs = useRef({});
    const modifierRefs = useRef({})
    const menuRefs = useRef({})


    const toggleForm = (projectId) => {
        setShowForms(prev => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };

    const toggleModifyName = (projectId) => {
        setModifyName(prev => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };

    const toggleMenu = (projectId) => {
        setMenu(prev => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };


    const handleDeleteProject = async (projectId) => {
        try {
            const response = await axios.post('http://127.0.0.1:7001/api/deleteProject/?id=' + projectId);

            if (response.data.success) {
                getProjects();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleChangeName = (event, projectId) => {
        setNewName(prev => ({
            ...prev,
            [projectId]: event.target.value
        }));
    };

    const handleSubmitNameChange = async (event, projectId) => {
        event.preventDefault();

        const form = modifierRefs.current[projectId];
        const newNameValue = form.querySelector('input').value;
        const data = {projectID: projectId, newName: newNameValue};
        try {
            const response = await axios.post('http://127.0.0.1:7001/api/modifyProjectName', data);
            if (response.data.success) {
                getProjects();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleClickOutside = (event, projectID, ref, setFunc, otherFunc = null) => {
        if (ref.current[projectID] && !ref.current[projectID].contains(event.target)) {
            setFunc(prev => ({
                ...prev,
                [projectID]: false
            }));
            if (otherFunc) {
                otherFunc(event, projectID);
            }
        }
    };

    useEffect(() => {
        const handleClick = (event) => {
            Object.keys(formRefs.current).forEach(projectID => {
                handleClickOutside(event, projectID, formRefs, setShowForms);
            });
            Object.keys(modifierRefs.current).forEach(projectID => {
                handleClickOutside(event, projectID, modifierRefs, setModifyName, handleSubmitNameChange);
            });
            Object.keys(menuRefs.current).forEach(projectID => {
                handleClickOutside(event, projectID, menuRefs, setMenu);
            })
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        projects.map(project => (
            <div
                key={project.id}
                className="h-fit w-full min-w-60 sm:w-1/2 md:w-1/4 lg:w-1/6 p-2 bg-gray-100 rounded-2xl shadow-xl"
            >
                <div ref={el => menuRefs.current[project.id] = el}>
                    {menuItems[project.id] && <MenuItems onOpenAddTaskForm={() => {toggleForm(project.id) ; toggleMenu(project.id)}} onDeleteProject={() => {handleDeleteProject(project.id);}}/>}
                    <MenuButton toggleMenu={() => toggleMenu(project.id)}/>
                </div>
                {modifyName[project.id] ?
                    (<form ref={el => modifierRefs.current[project.id] = el}
                           onSubmit={(e) => handleSubmitNameChange(e, project.id, project.name)}>
                        <input
                            type="text"
                            defaultValue={project.name}
                            onChange={(e) => handleChangeName(e, project.id)}
                            className="mt-2 mb-1 p-2 border rounded text-md font-semibold"
                            required
                        />
                    </form>) :
                    (<button className="text-md font-bold mb-4 mt-1.5 pt-2 pl-2"
                             onClick={() => toggleModifyName(project.id)}> {project.name}  </button>)
                }

                <Task tasks = {project.tasks}/>

                {showForms[project.id] ? (
                    <div ref={el => formRefs.current[project.id] = el}>
                        <AddTaskForm projectID={project.id} onCancel={() => toggleForm(project.id)}/>
                    </div>
                ) : (
                    <AddTaskButton onOpen={() => toggleForm(project.id)}/>
                )}

            </div>
        ))
    );
};

export default Project;
