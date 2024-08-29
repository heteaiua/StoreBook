import React, {useEffect} from 'react';
import './CustomNavbar.css'
import DropdownCartOrders from "../../pages/order/DropdownCartOrders";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../zustand/userStore";
import {useOrderdata} from "../../zustand/orderStore";
import {useBooksData} from "../../zustand/bookStore";

function CustomNavbar() {
    const navigate = useNavigate()
    const {isAuthenticated, logout, checkAuth, user, fetchUser} = useAuth();
    const {resetOrdersCache} = useOrderdata();
    const {resetBooksCache} = useBooksData();

    useEffect(() => {
        checkAuth();
        if (isAuthenticated) {
            fetchUser();
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        resetOrdersCache();
        resetBooksCache();
        logout();
        navigate('/login');
    };
    return (
        <nav className="navbar-custom">
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">
                    <span className="bi bi-shop">BookStore</span>
                </Link>
            </div>
            <div className="navbar-toggle">

                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <DropdownCartOrders/>
                    </li>
                    <li className="navbar-item">
                        <Link to="/books" className="navbar-link">Books</Link>
                    </li>
                    {isAuthenticated && user?.role === 'user' && (
                        <li className="navbar-item">
                            <Link to="/profile" className="navbar-link">Profile</Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <>
                            <li className="navbar-item">
                                <Link to="/orders" className="navbar-link">Orders</Link>
                            </li>
                            <li className="navbar-item">
                                <button className="btn btn-secondary" onClick={handleLogout}>LOG OUT</button>
                            </li>
                        </>
                    )}
                    {!isAuthenticated && (
                        <>
                            <li className="navbar-item">
                                <Link to="/login" className="navbar-link">Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="navbar-link">Register</Link>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    );
}

export default CustomNavbar;
