import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CustomNavbar from './components/navbar/CustomNavbar';
import LoginForm from './pages/login/login';
import Dashboard from "./pages/dashboard/dashboard";

function App() {
    return (
        <Router>
            <CustomNavbar/>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/login" element={<LoginForm/>}/>
            </Routes>
        </Router>
    );
}

export default App;
