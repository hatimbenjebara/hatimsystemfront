import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Style.css';

const EmployeeDetail = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loginTime, setLoginTime] = useState(new Date());
    const backendUrl = process.env.NODE_ENV === 'production' 
        ? "https://hatimsysadm-backend.onrender.com"
        : "http://localhost:4000";

    useEffect(() => {
        // Fetch employee details
        axios.get(`${backendUrl}/employee/detail/${id}`)
            .then(res => {
                setEmployee(res.data.result);
                setLoginTime(new Date()); // Set login time when details are fetched
            })
            .catch(err => console.error(err));

        // Fetch categories
        axios.get(`${backendUrl}/categories`)
            .then(res => {
                setCategories(res.data.result); // Assuming categories are in res.data.result
            })
            .catch(err => console.error(err));
    }, [id, backendUrl]);

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown Category';
    };

    const handleLogout = () => {
        const logoutTime = new Date();
        const hoursWorked = Math.round(Math.abs(logoutTime - loginTime) / 36e5); // Round to the nearest hour
        // Send hours worked to the backend
        axios.post(`${backendUrl}/employee/update-hours`, { id: employee.id, hoursWorked })
            .then(() => {
                axios.get(`${backendUrl}/employee/logout`)
                    .then(res => {
                        console.log(res.data.Status);
                        if (res.data.status) {
                            localStorage.removeItem("value");
                            navigate('/employee_login');
                        } else {
                            console.error("Logout failed:", res.data.error);
                            alert("Logout failed");
                        }
                    })
                    .catch(err => {
                        console.error("Logout error:", err);
                        alert("Logout failed");
                    });
            })
            .catch(err => {
                console.error("Logout error:", err);
                alert("Logout failed");
            });
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h4>Hello {employee.first_name} {employee.last_name} Profile</h4>
            </div>
            <div>
                <img src={`${backendUrl}/images/${employee.image}`} alt={employee.name} className="employee_image" />
                <div>
                    <h3>Name: {employee.first_name} {employee.last_name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Role: {employee.role}</h3>
                </div>
                <div>
                    <button className="btn btn-warning btn-sm" onClick={handleLogout}>
                        <a href="#" className="nav-link">
                            <span className="ms-1 d-none d-sm-inline">Logout</span>
                        </a>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
