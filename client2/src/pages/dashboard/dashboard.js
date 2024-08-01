import React from  'react'
import BookGrid from "../../components/book-container/bookGrid";
import './dashboard.css'
import FilterBook from "../../components/filter-container/filters";
const Dashboard = (name, author, year, genre) => {
    return (
       <div>
           <h1 className='welcome-message'>BOOKS</h1>
           <FilterBook/>
       <BookGrid/>
       </div>
    );
};
export default Dashboard;
