import React from 'react'
// import'./login.css'
import {Form, FormLabel} from "react-bootstrap"
function LoginForm() {
    return (
        <div className="grid-container">
            <div className="up"></div>
            <div className="container">
                <div className="login-style">
                    <label className="label-form"><b>Hello! Welcome back!</b></label>
                    <Form>
                        <div className="form-wrapper">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email"/>
                            </div>
                            <div className="form-group">
                                <label className="password">Password</label>
                                <input type="password" className="form-control" id="password"
                                       placeholder="Enter your password"/>
                            </div>
                        </div>
                        <div className="password-bottom">
                            <div className="forgot-password">
                                <label>Forgot password? <button type="button" className="btn btn-outline-info">Click
                                    here</button></label>
                            </div>
                            <div className="btn-login">
                                <button type="submit" className="btn btn-outline-secondary">Login</button>
                            </div>
                            <div className="register">
                                <label>Not a member? <button type="button" className="btn btn-outline-secondary"
                                                             id="registerBtn">Register</button></label>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );}

export default LoginForm