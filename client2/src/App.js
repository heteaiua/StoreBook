import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import CustomNavbar from './components/navbar/CustomNavbar';
import LoginForm from './pages/login/Login';
import BookPage from "./pages/book/BookPage";
import BookDetailsPage from "./pages/book/BookDetailsPage";
import Home from "./pages/home/Home";
import OrdersPage from "./pages/order/OrdersPage";
import Register from './pages/register/Register';
import UserProfile from "./pages/user/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderDetailsPage from "./pages/order/OrderDetailsPage";


function App() {
    return (
        <Router>
            <div className="main-layout">
                <CustomNavbar/>
                <div className="body-layout">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/books" element={<BookPage/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/books/:id" element={<BookDetailsPage/>}/>
                        <Route path="/orders" element={<ProtectedRoute element={<OrdersPage/>}/>}/>
                        <Route path="/profile" element={<ProtectedRoute element={<UserProfile/>}/>}/>
                        <Route path="/orders/:id" element={<ProtectedRoute element={<OrderDetailsPage/>}/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
