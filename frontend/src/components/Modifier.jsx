import React, {useState} from 'react'
import Modal from "react-modal"
import axios from "axios"

function ModifierModal( { closeModifier, showModifier } ) {
    const [modifierUsername, setModifierUsername ] =  useState("")
    const [modifierPassword, setModifierPassword] = useState("")
    const [identifyPassword, setIdentifyPassword] = useState('');
    const [email, setEmail] = useState("")

    const handleModifySubmit = async (e) => {
        e.preventDefault();
        if (!modifierUsername) {
            alert('请输入用户名');
            return;
        }

        if (!modifierPassword) {
            alert('请输入密码');
            return;
        }

        if (!identifyPassword) {
            alert('请再次输入密码');
            return;
        }

        if (modifierPassword !== identifyPassword) {
            alert('两次输入的密码不一致');
            return;
        }

        if (!email) {
            alert('请输入邮箱');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('请输入正确的邮箱格式');
            return;
        }

        const modifierData = {
            username: modifierUsername,
            password: modifierPassword,
            email: email
        }

        try {
            const response = await axios.post('http://127.0.0.1:7001/api/modifier', modifierData);
            if (response.data.success) {
                alert('修改密码成功');
                closeModifier();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal
            isOpen={showModifier}
            onRequestClose={closeModifier}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-50 w-96"
            overlayClassName="fixed inset-0 bg-gray-50 bg-opacity-50"
        >
            <button
                onClick={closeModifier}
                className="absolute top-4 right-4 text-gray-500 text-3xl hover:text-gray-800"
            >
                &times;
            </button>
            <h2 className="text-4xl text-left font-black font-serif">修改密码</h2>
            <form>
                <div className="mt-4">
                    <label htmlFor="register-username" className="text-xl font-serif font-semibold">用户名</label>
                    <input
                        type="text"
                        id="register-username"
                        value={modifierUsername}
                        onChange={(e) => setModifierUsername(e.target.value)}
                        placeholder="请输入你的用户名"
                        className="mt-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="register-password" className="text-xl font-serif font-semibold">密码</label>
                    <input
                        type="password"
                        id="register-password"
                        value={modifierPassword}
                        onChange={(e) => setModifierPassword(e.target.value)}
                        placeholder="请输入你的密码"
                        className="mt-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="identify-password" className="text-xl font-serif font-semibold">确认密码</label>
                    <input
                        type="password"
                        id="identify-password"
                        value={identifyPassword}
                        onChange={(e) => setIdentifyPassword(e.target.value)}
                        placeholder="再次输入你要修改的密码"
                        className="mt-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="email" className="text-xl font-serif font-semibold">确认密码</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="请输入注册时填写的邮箱"
                        className="mt-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                        required
                    />
                </div>
                <div className="flex justify-center text-center w-full">
                    <button
                        onClick={handleModifySubmit}
                        className="w-full mt-10 py-2 border border:bg-blue-100 bg-blue-500 text-gray-50 rounded-lg hover:bg-blue-600">注册
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default ModifierModal