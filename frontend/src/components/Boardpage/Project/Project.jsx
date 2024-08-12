import React, {useEffect, useState, useRef} from "react";
import AddTaskButton from "./Task/AddTaskButton.jsx";
import AddTaskForm from "./Task/AddTaskForm.jsx";
import MenuButton from "./MenuButton.jsx";
import axios from "axios";
import MenuItems from "./MenuItems";
import Task from "./Task/Task"

const Project = ({projects, getProjects}) => {
    const [showForms, setShowForms] = useState({});
    const [modifyName, setModifyName] = useState({})
    const [tasks, setTasks] = useState({});
    const [newName, setNewName] = useState({})
    const [menuItems, setMenu] = useState({})
    const [showDelete, setShowDelete] = useState({});
    const formRefs = useRef({});
    const modifierRefs = useRef({})
    const menuRefs = useRef({})

    const getTasks = async (projectID) => {
        try {
            const response = await axios.get('http://127.0.0.1:7001/api/tasks?id=' + projectID);
            if (response.data.success) {
                setTasks(prev => ({
                    ...prev,
                    [projectID]: response.data.data
                }));
            }
        } catch (e) {
            console.error(e);
        }
    }

    const deleteTask = async (projectID, taskID) => {
        try {
            const response = await axios.post('http://127.0.0.1:7001/api/deleteTask?id=' + taskID);
            if (response.data.success) {
                await getTasks(projectID);
            }
        } catch (e) {
            console.error(e);
        }
    }


    const toggleForm = (projectID) => {
        setShowForms(prev => ({
            ...prev,
            [projectID]: !prev[projectID]
        }));
    };

    const toggleModifyName = (projectID) => {
        setModifyName(prev => ({
            ...prev,
            [projectID]: !prev[projectID]
        }));
    };

    const toggleMenu = (projectID) => {
        setMenu(prev => ({
            ...prev,
            [projectID]: !prev[projectID]
        }));
    };

    const toggleDelete = (projectID) => {
        setShowDelete(prev => ({
            ...prev,
            [projectID]: !prev[projectID]
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

    const handleTasksUpdate = (projectID) => {
        getTasks(projectID);
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

    useEffect(() => {
        projects.forEach(project => {
            getTasks(project.id);
        });
    }, [projects]);

    return (
        projects.map(project => (
            <div
                key={project.id}
                className="h-fit w-full min-w-60 sm:w-1/2 md:w-1/4 lg:w-1/6 p-2 bg-gray-100 rounded-2xl shadow-xl"
            >
                <div ref={el => menuRefs.current[project.id] = el}>
                    {menuItems[project.id] &&
                        <MenuItems onOpenAddTaskForm={() => {
                            toggleForm(project.id);
                            toggleMenu(project.id)
                        }} onDeleteProject={() => {
                            handleDeleteProject(project.id);
                        }} onDeleteTask={() => {
                            toggleDelete(project.id);
                            toggleMenu(project.id)
                        }}/>}
                    <MenuButton toggleMenu={() => toggleMenu(project.id)}/>
                </div>
                {modifyName[project.id] ?
                    (<form ref={el => modifierRefs.current[project.id] = el}
                           onSubmit={(e) => handleSubmitNameChange(e, project.id, project.name)}>
                        <input
                            type="text"
                            defaultValue={project.name}
                            onChange={(e) => handleChangeName(e, project.id)}
                            className="mt-2 mb-2 p-2 border rounded text-md font-semibold"
                            required
                        />
                    </form>) :
                    (<button className="text-md font-bold mb-4 mt-2 pt-2 pl-2"
                             onClick={() => toggleModifyName(project.id)}> {project.name}  </button>)
                }
                <Task projectID={project.id} tasks={tasks[project.id] || []} showDelete={showDelete[project.id]}
                      deleteTask={deleteTask} onTaskUpdated={() => getTasks(project.id)}/>
                {showForms[project.id] ? (
                    <div ref={el => formRefs.current[project.id] = el}>
                        <AddTaskForm projectID={project.id} onCancel={() => toggleForm(project.id)}
                                     onTaskAdded={() => handleTasksUpdate(project.id)}/>
                    </div>
                ) : (
                    <AddTaskButton onOpen={() => toggleForm(project.id)}/>
                )}
            </div>
        ))
    );
};

export default Project;
