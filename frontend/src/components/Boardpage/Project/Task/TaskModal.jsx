import React, {useEffect, useRef, useState} from 'react';
import Modal from "react-modal";
import axios from "axios";
import {useAuth} from "../../../../context/AuthContext.jsx";

const TaskModal = ({showTaskModal, closeTaskModal, task, onTaskUpdated}) => {
    const {user} = useAuth();
    const [editDescription, setEditDescription] = useState(false)
    const [description, setDescription] = useState(task.description);

    const [editTitle, setEditTitle] = useState(false);
    const [title, setTitle] = useState(task.title);

    const [editComment, setEditComment] = useState(false)
    const [comment, setComment] = useState('')

    const [comments, setComments] = useState(task.comments);

    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const [attachments, setAttachments] = useState(task.attachments);

    useEffect(() => {
        setDescription(task.description);
    }, [task.description]);

    useEffect(() => {
        setComments(task.comments);
    }, [task.comments]);

    useEffect(() => {
        setAttachments(task.attachments);
        console.log(task.attachments)
    }, [task.attachments]);

    const handleSubmitDescription = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:7001/api/updateTaskDescription', {
                id: task.id,
                description: description
            });
            if (response.data.success) {
                onTaskUpdated();
                setEditDescription(false);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleSubmitTaskTitle = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:7001/api/updateTaskTitle', {
                taskID: task.id,
                userID: user.id,
                title: title
            });
            if (response.data.success) {
                await onTaskUpdated();
                setEditTitle(false);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:7001/api/addComment', {
                taskID: task.id,
                userID: user.id,
                content: comment
            });
            if (response.data.success) {
                await onTaskUpdated();
                setComment('');
                setEditComment(false);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await axios.post('http://127.0.0.1:7001/api/deleteComment?id=' + commentId);
            if (response.data.success) {
                await onTaskUpdated();
            }}catch (e){
            console.error(e);
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUploadFile = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('taskID', task.id);

        try {
            const response = await axios.post('http://127.0.0.1:7001/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                onTaskUpdated();
                setFile(null);
                fileInputRef.current.value = '';
                alert('上传成功');
            }
        } catch (e) {
            console.error(e);
            setFile(null);
            fileInputRef.current.value = '';
            alert('上传失败');
        }
    };

    const handleDownload = (filename) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = `http://127.0.0.1:7001/api/download?filename=${encodeURIComponent(filename)}`;
        downloadLink.download = filename; // 提示浏览器下载文件
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const deleteAttachment = async (id) => {
        try {
            const response = await axios.post('http://127.0.0.1:7001/api/deleteAttachment?id=' + id);
            if (response.data.success){
                onTaskUpdated();
                alert('删除成功');
            }
        }catch (e){
            console.log('删除失败');
        }
    }


    return (
        <Modal
            isOpen={showTaskModal}
            onRequestClose={closeTaskModal}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 p-6 rounded-lg shadow-lg z-50 w-2/5"
            overlayClassName="fixed inset-0 bg-gray-50 bg-opacity-50"
        >
            <div className="flex items-center">
                {editTitle ?
                    (<div className="w-full">
                        <form onSubmit={handleSubmitTaskTitle} className="space-x-4 flex items-center">
                            <input
                                value={title}
                                className="text-3xl text-gray-700 font-bold px-0.5 py-1 border-2 border-blue-400 rounded-md"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <div className="space-x-2">
                                <button type="submit"
                                        className="bg-blue-500 text-white px-2 py-1 rounded-sm hover:bg-blue-700">保存
                                </button>
                                <button type="submit"
                                        className="text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-200"
                                        onClick={() => setEditTitle(false)}>取消
                                </button>
                            </div>
                        </form>
                    </div>)
                    : (<button className="font-bold text-3xl text-gray-700 w-full text-left mx-1 my-1.5"
                               onClick={() => setEditTitle(true)}>{task.title}</button>
                    )}
                <button onClick={closeTaskModal}
                        className="w-10 h-10 text-3xl hover:bg-gray-200 hover:rounded-full"> &times; </button>
            </div>
            <div className="flex flex-col mt-4 mx-1">
                <h2 className="font-bold text-xl text-gray-700">描述</h2>
                {editDescription ?
                    (<div>
                            <form onSubmit={handleSubmitDescription}>
                                <textarea
                                    className="w-full h-32 border border-gray-400 rounded p-2 resize-none break-words mt-2"
                                    value={description}
                                    onChange={(e => setDescription(e.target.value))}
                                    required/>
                                <div className="space-x-1 mt-1">
                                    <button type="submit"
                                            className="bg-blue-500 text-white px-2 py-1 rounded-xl hover:bg-blue-700">保存
                                    </button>
                                    <button className="text-gray-600 px-2 py-1 rounded-xl hover:bg-gray-200"
                                            onClick={() => setEditDescription(false)}>取消
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) :
                    (<button
                        onClick={() => setEditDescription(true)}
                        className="bg-gray-100 hover:bg-gray-200 text-left text-gray-600 pt-2 pb-12 px-2 mt-2"
                    >
                        {task.description || "点击添加详细任务描述..."}
                    </button>)
                }
            </div>
            <div className="flex flex-col mt-4 mx-1">
                <h2 className="font-bold text-xl text-gray-700">活动</h2>
                {editComment ?
                    (<div>
                        <form onSubmit={handleSubmitComment}>
                                <textarea
                                    className="w-full h-16 border border-gray-400 rounded p-2 resize-none break-words mt-2"
                                    value={comment}
                                    onChange={(e => setComment(e.target.value))}
                                    required/>
                            <div className="space-x-1 mt-1">
                                <button type="submit"
                                        className="bg-blue-500 text-white px-2 py-1 rounded-xl hover:bg-blue-700">保存
                                </button>
                                <button className="text-gray-600 px-2 py-1 rounded-xl hover:bg-gray-200"
                                        onClick={() => setEditComment(false)}>取消
                                </button>
                            </div>
                        </form>
                    </div>) :
                    (<button onClick={() => setEditComment(true)}
                             className="bg-white rounded-md text-left text-gray-500 py-2 px-2 mt-2 border border-gray-300 shadow-sm hover:bg-gray-100">添加评论...</button>)
                }
                <div className="mt-2 flex flex-row flex-wrap overflow-y-auto max-h-64 min-h-32">
                    {comments && comments.map(comment => (
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row items-center space-x-2">
                                <p className="text-md text-gray-600 font-semibold mt-2">{comment.user.username}</p>
                                <p className="text-sm text-gray-500 mt-2">{new Date(comment.createdAt).toLocaleString()}</p>
                            </div>
                            <p className="mt-2 p-2 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-700 w-full">{comment.content}</p>
                            <button className="mt-1 mx-1 text-sm underline text-start text-gray-600" onClick={() => handleDeleteComment(comment.id)}>删除</button>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex flex-col space-y-2">
                    <h2 className="font-bold text-xl text-gray-700">附件</h2>
                    {attachments.length > 0? (<ul className="list-disc mx-2">
                        {attachments.map((attachment) => (
                            <li key={attachment.id} className="text-gray-500">
                                {attachment.filename}
                                <button className="underline mx-2 text-blue-500 hover:text-blue-700" onClick={() => handleDownload(attachment.filename)}>下载</button>
                                <button className="underline mx-2 hover:text-gray-800" onClick={() => deleteAttachment(attachment.id)}>删除</button>
                            </li>
                        ))}
                    </ul> ): (<p className="text-gray-600 mx-2">暂无附件</p>)}
                    <form onSubmit={handleUploadFile} className="flex flex-col umt-2">
                        <input type="file" onChange={handleFileChange} className="mt-8 mx-2.5" ref={fileInputRef}/>
                        <button type="submit"
                                className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 ml-2">上传附件
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    )
};

export default TaskModal;
