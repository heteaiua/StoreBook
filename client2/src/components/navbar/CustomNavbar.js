import React, {useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, NavItem} from 'react-bootstrap';
import './CustomNavbar.css'
import DropdownCartOrders from "../../pages/order/DropdownCartOrders";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../zustand/userStore";

function CustomNavbar() {
    const navigate = useNavigate()
    const {isAuthenticated, logout, checkAuth, user, fetchUser} = useAuth();

    useEffect(() => {
        checkAuth();
        if (isAuthenticated) {
            fetchUser();
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    return (
        <Navbar className="nav-style">
            <Container>
                <Navbar.Brand href="/"><span className="bi bi-shop">BookStore</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavItem>
                            <Nav.Link href="/books">Books</Nav.Link>
                        </NavItem>
                        {isAuthenticated && (
                            <>
                                {user && user.role === 'admin' && (
                                    <NavItem>
                                        <Nav.Link href="/orders">Orders</Nav.Link>
                                    </NavItem>
                                )}
                                <NavItem>
                                    <Nav.Link href="/profile">Profile</Nav.Link>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        {!isAuthenticated ? (
                            <>
                                <NavItem>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </NavItem>
                                <NavItem>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                </NavItem>
                            </>
                        ) : (
                            <Button onClick={handleLogout}>LOG OUT</Button>
                        )}
                        <DropdownCartOrders/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
