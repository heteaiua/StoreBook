import React, {useState} from 'react';
import './login.css';
import {Form} from 'react-bootstrap';
import {loginAPI} from '../../endpoints/userEndpoints';
import {useNavigate} from 'react-router-dom';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {useAuth} from "../../zustand/userStore"
import {setAccessToken} from "../../utils/authHelpers";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const {login} = useAuth();
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email invalid";
        }
        if (!password) {
            newErrors.password = "Password required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await loginAPI(email, password);
            setAccessToken(response.data.accessToken)
            localStorage.setItem('userRole', response.data.user.role);
            login();
            navigate('/profile');
        } catch (error) {
            console.error('Login failed:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrors({server: error.response.data.message});
            } else {
                setErrors({server: "An unexpected error occurred"});
            }
        }
    };
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="grid-container">
            <div className="up"></div>
            <div className="login-container">
                <div className="login-style">
                    <label className="label-form"><b>Hello! Welcome back!</b></label>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-wrapper">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleEmail}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="form-group">
                                <label className="password">Password</label>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handlePassword}
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ? <FaEyeSlash/> : <FaEye/>}
                                </button>
                                {errors.password && <div className="invalid-feedback-error">{errors.password}</div>}

                                {errors.server && <div className="invalid-feedback-error">{errors.server}</div>}
                            </div>
                        </div>
                        <div className="password-bottom">
                            <div className="forgot-password">
                                <label>Forgot password? <button type="button" className="btn btn-outline-info">Click
                                    here</button></label>
                            </div>
                            <div className="btn-login">
                                <button type="submit" className="btn btn-outline-secondary"
                                        disabled={!email || !password}
                                >Login
                                </button>
                            </div>
                            <div className="register">
                                <label>Not a member? <button type="button" className="btn btn-outline-secondary"
                                                             onClick={() => navigate('/register')}>Register</button>
                                </label>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
