import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import CustomNavbar from './components/navbar/CustomNavbar';
import LoginForm from './pages/login/login';
import Dashboard from "./pages/dashboard/dashboard";
import BookDetails from "./pages/book/book";
import Home from "./pages/home/home-page";
import ShoppingCart from "./pages/cart/cart";
import Register from './pages/register/register';
import UserProfile from "./pages/user/user";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    return (
        <Router>

            <div className="main-layout">
                <CustomNavbar/>
                <div className="body-layout">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/books" element={<Dashboard/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/books/:id" element={<BookDetails/>}/>
                        <Route path="/orders" element={<ProtectedRoute element={<ShoppingCart/>}/>}/>
                        <Route path="/profile" element={<ProtectedRoute element={<UserProfile/>}/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
