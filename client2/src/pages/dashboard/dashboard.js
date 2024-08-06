import React, {useState} from 'react'
import BookGrid from "../../components/book-container/bookGrid";
import './dashboard.css'

const Dashboard = () => {
    return (
        <div>
            <h1 className='welcome-message'><span><i className="bi bi-book"></i></span>BOOKS</h1>
            <BookGrid/>
        </div>
    );
};
export default Dashboard;
