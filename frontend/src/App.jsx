import {useState} from 'react'
import './App.css'
import './styles/input.css'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from "./pages/loginPage.jsx";
import HomePage from "./pages/homePage.jsx"
import {AuthProvider} from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import Modal from 'react-modal';

Modal.setAppElement('#root');


function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Navbar />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
