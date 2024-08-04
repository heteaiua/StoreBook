import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import CustomNavbar from './components/navbar/CustomNavbar';
import LoginForm from './pages/login/login';
import Dashboard from "./pages/dashboard/dashboard";

function App() {
    return (
        <Router>
            <div className="main-layout">
                <CustomNavbar/>

                <div className="body-layout">
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
