import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavItem} from 'react-bootstrap';
import './CustomNavbar.css'
import DropdownCart from "../../pages/cart/dropdown-cart";

function CustomNavbar() {

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
                        <NavItem>
                            <Nav.Link href="">Users</Nav.Link>
                        </NavItem>
                    </Nav>
                    <Nav>
                        <NavItem>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </NavItem>
                        <NavItem>
                            <Nav.Link href="">Register</Nav.Link>
                        </NavItem>
                        <DropdownCart/>

                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}

export default CustomNavbar;
