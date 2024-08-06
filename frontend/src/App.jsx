import './App.css'
import './styles/input.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/loginPage.jsx";
import HomePage from "./pages/homePage.jsx"
import {AuthProvider} from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import BoardPage from "./pages/boardPage.jsx"

function App() {
    return (
        <div className="flex flex-col h-screen">
        <AuthProvider>
            <Router>
                    <Navbar />
                        <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/board" element={<BoardPage />}/>
                        </Routes>
                    <Footer />
            </Router>
        </AuthProvider>
        </div>
    )
}

export default App
