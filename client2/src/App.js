import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import CustomNavbar from './components/navbar/CustomNavbar';
import LoginForm from './pages/login/login';
import Dashboard from "./pages/dashboard/dashboard";
import BookDetails from "./pages/book/book";
import {useBooksData} from "./zustand/book.store";
import Home from "./pages/home/home-page";

function App() {
    const {fetchOptionList,fetchBooks}=useBooksData()

    useEffect(()=>{
        fetchOptionList();
    },[])

    return (
        <Router>
            <div className="main-layout">
                <CustomNavbar/>

                <div className="body-layout">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/books" element={<Dashboard/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/books/:id" element={<BookDetails/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
