import React, { useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import music from '../assets/music.png';
import blogs from '../assets/blogs.png';
import news from '../assets/news.png';

function Dashboard({ sidebar }) {
    const navigate = useNavigate();
    const backendUrl = process.env.NODE_ENV === 'production' 
        ? "https://hatimsysadm-backend.onrender.com"
        : "http://localhost:4000";
    
    axios.defaults.withCredentials = true;

    const handleLogout = () => {
        axios.get(`${backendUrl}/auth/logout`)
        .then(result => {
            if (result.data.Status) {
                localStorage.removeItem("valid");
                navigate('/');
            } else {
                alert(result.data.Error);
            }
        }).catch(err => console.log(err));
    }

    return (
        <div className="container-fluid">   
                    <nav className={`nav-left  ${sidebar ? "" : "small-sidebar"}`}>
                         <div className="side-link">
                                    <Link to="/dashboard" className="nav-link">
                                        <span className="link-text">Resume</span> 
                                    </Link>
                                </div>
                                <div className="side-link">
                                    <Link to="/dashboard/employee" className="nav-link">
                                        <span className="link-text">Employees</span> 
                                    </Link>
                                </div>   
                                <div className="side-link">
                                    <Link to="/dashboard/category" className="nav-link">
                                        <span className="link-text">Category</span> 
                                    </Link>
                                </div>
                                <div className="side-link">
                                    <Link to="/dashboard/profile" className="nav-link">
                                        <span className="link-text">Activite</span>
                                    </Link>
                                </div>
                                <div className="side-link" onClick={handleLogout}>
                                    <button className="nav-link logout-btn" onClick={handleLogout}>
                                        <span className="link-text">Logout</span>
                                    </button>
                                </div>

                </nav>                        					
                    <div className="page-content">
                        <Outlet />
                    </div>

        </div>
    )
}

export default Dashboard;
