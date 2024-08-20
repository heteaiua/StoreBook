import React, {useEffect, useState} from 'react';
import './user-profile.css'
import {useAuth} from "../../zustand/userStore";
import MyOrder from "../../components/myOrder/myOrder";

const initializeFormData = (user) => ({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    address: user.address || '',
    phoneNumber: user.phoneNumber || '',
});

const UserProfile = () => {
    const [formData, setFormData] = useState({});
    const {
        user,
        editMode,
        toggleEditMode,
        updateUser,
    } = useAuth(state => ({
        user: state.user,
        error: state.error,
        fetchUser: state.fetchUser,
        editMode: state.editMode,
        updateUser: state.updateUser,
        toggleEditMode: state.toggleEditMode,
    }));


    useEffect(() => {
        if (user) {
            setFormData(initializeFormData(user));
        }
    }, [user]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSaveClick = () => {
        if (user) {
            updateUser({...formData, _id: user._id});
        }
    };

    const handleCancelClick = () => {
        toggleEditMode();
        setFormData(initializeFormData(user));
    };
    return (
        <div className="order-page">
            <h1 className="welcome-message">{user.firstName}'s profile</h1>
            <div className="data-container">
                {editMode ? (
                    <div className="edit-profile">
                        <label>
                            <strong>First Name:</strong>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <strong>Last Name:</strong>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <strong>Email:</strong>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                            />
                        </label>
                        <label>
                            <strong>Address:</strong>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <strong>Phone Number:</strong>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </label>
                        <button className="btn btn-outline-secondary" onClick={handleSaveClick}>Save</button>
                        <button className="btn btn-outline-secondary" onClick={handleCancelClick}>Cancel</button>
                    </div>
                ) : (
                    <div className="show-profile-details">
                        <p><strong>First Name:</strong> {user.firstName}</p>
                        <p><strong>Last Name:</strong> {user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        <button className="btn btn-outline-secondary" onClick={toggleEditMode}>Edit</button>
                    </div>
                )}
            </div>
            <div className="user-book-section">
                {user && <MyOrder userId={user._id}/>}
            </div>
        </div>

    );
};

export default UserProfile;
