import { useState } from 'react'
import './App.css'
import './styles/input.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from "./pages/loginPage.jsx";
import HomePage from "./pages/homePage.jsx"

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="*" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>

                </Routes>
            </div>
        </Router>
    )
}

export default App
