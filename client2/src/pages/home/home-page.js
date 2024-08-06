import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

 export default function Home  (){
    return (
        <div className="welcome-message-home">
            <header className="welcome-header">
                <h1>Welcome to Book App</h1>
                <p>Your one-stop solution for  discovering new reads.</p>
            </header>
            <body>
            <img className="welcome-img" src="https://media.architecturaldigest.com/photos/55f9df5a14adf283236d85f4/16:9/w_1280,c_limit/dam-images-architecture-2013-11-libraries-libraries-22-st-florian-monastery.jpg"
                 alt="wallpaper"/>

            </body>

            <footer className="welcome-footer">
                <p>&copy; 2024 Book App. All rights reserved.</p>
            </footer>
        </div>
    );
}