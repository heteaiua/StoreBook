import React, {useState} from 'react'
import BookGrid from "../../components/book-container/bookGrid";
import './dashboard.css'
import FilterBook from "../../components/filter-container/filters";

const Dashboard = () => {
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const handleAuthorChange = (val) => {
        setSelectedAuthor(val);
    };
    return (
        <div>
            <h1 className='welcome-message'>BOOKS</h1>
            <BookGrid/>
        </div>
    );
};
export default Dashboard;
