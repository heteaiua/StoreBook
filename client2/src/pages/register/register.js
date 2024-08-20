import React, {useState} from 'react';
import './register.css';
import {Link, useNavigate} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import {useRegisterStore} from '../../zustand/register.store';
import {registerAPI} from '../../endpoints/userEndpoints';

const formFields = [
    {id: 'firstName', placeholder: 'First Name'},
    {id: 'lastName', placeholder: 'Last Name'},
    {id: 'email', placeholder: 'Email', type: 'email'},
    {id: 'age', placeholder: 'Age', type: 'number'},
    {id: 'address', placeholder: 'Address'},
    {id: 'phoneNumber', placeholder: 'Phone Number'}
];

const RegisterForm = () => {
    const {formData, setField, resetForm} = useRegisterStore(state => ({
        formData: state.formData,
        setField: state.setField,
        resetForm: state.resetForm
    }));
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateFormRegister = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        if (!formData.firstName) {
            newErrors.firstName = "First Name is required";
        }
        if (!formData.lastName) {
            newErrors.lastName = "Last Name is required";
        }
        if (!formData.age) {
            newErrors.age = "Age is required";
        }
        if (formData.password !== formData.rePassword) {
            newErrors.rePassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const {id, value} = e.target;
        setField(id, value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateFormRegister()) {
            return;
        }
        try {
            const response = await registerAPI(formData);
            console.log(response.data);
            navigate('/login');
            resetForm();
        } catch (err) {
            console.log("Registration failed", err);
            setErrors({server: err.response?.data?.message || "An unexpected error occurred"});
        }
    };

    return (
        <div className="register-grid-container">
            <div className="register-up"></div>
            <div className="register-container">
                <div className="register-form-container">
                    <h1 className="register-align-content-center">
                        <span><i className="bi bi-book"></i></span> Welcome!
                    </h1>

                    <Form className="form-wrapper-register" onSubmit={handleSubmit}>
                        {formFields.map((field, index) => (
                            <div className="register-form-group row" key={index}>
                                <label className="col-sm-2 col-form-label">{field.placeholder}</label>
                                <div className="col-sm-10">
                                    <input
                                        type={field.type || 'text'}
                                        className={`form-control ${errors[field.id] ? 'is-invalid' : ''}`}
                                        id={field.id}
                                        placeholder={field.placeholder}
                                        value={formData[field.id] || ''}
                                        onChange={handleChange}
                                    />
                                    {errors[field.id] &&
                                        <div className="invalid-feedback-error">{errors[field.id]}</div>}
                                </div>
                            </div>
                        ))}
                        <div className="register-form-group row">
                            <label className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    placeholder="Password"
                                    value={formData.password || ''}
                                    onChange={handleChange}
                                />
                                {errors.password && <div className="invalid-feedback-error">{errors.password}</div>}
                            </div>
                        </div>
                        <div className="register-form-group row">
                            <label className="col-sm-2 col-form-label">Re-enter Password</label>
                            <div className="col-sm-10">
                                <input
                                    type="password"
                                    className={`form-control ${errors.rePassword ? 'is-invalid' : ''}`}
                                    id="rePassword"
                                    placeholder="Re-enter Password"
                                    value={formData.rePassword || ''}
                                    onChange={handleChange}
                                />
                                {errors.rePassword && <div className="invalid-feedback-error">{errors.rePassword}</div>}

                            </div>
                        </div>
                        <div className="register-password-bottom">
                            <div className="register-form-submit">
                                <button
                                    type="submit"
                                    className="btn btn-outline-secondary"
                                    disabled={!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.age || !formData.rePassword}
                                >
                                    Sign up
                                </button>
                            </div>
                            <div className="register-login-form">
                                <label>Already a member? <Link to="/login"
                                                               className="btn btn-outline-secondary">Login</Link></label>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
