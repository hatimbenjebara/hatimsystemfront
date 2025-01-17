import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css'

const Home = () => {
    const [adminTotal, setAdminTotal] = useState(0);
    const [employeeTotal, setEmployeeTotal] = useState(0);
    const [salaryTotal, setSalaryTotal] = useState(0);
    const [admins, setAdmins] = useState([]);
    const backendUrl = process.env.NODE_ENV === 'production' 
    ? "https://hatimsysadm-backend.onrender.com"
    : "http://localhost:4000";
    useEffect(() => {
        adminCount();
        employeeCount();
        salaryCount();
        AdminRecords();
    }, []);

    const AdminRecords = () => {
        axios.get(`${backendUrl}/auth/admin_records`)
            .then(res => {
                if (res.data.Status) {
                    setAdmins(res.data.Result)
                }
            })
            .catch(err => console.error(err));
    }

    const adminCount = () => {
        axios.get(`${backendUrl}/auth/admin_count`)
            .then(res => {
                if (res.data.Status) {
                    setAdminTotal(res.data.Result[0].admin)
                }
            })
            .catch(err => console.error(err));
    }

    const employeeCount = () => {
        axios.get(`${backendUrl}/auth/employee_count`)
            .then(res => {
                if (res.data.Status) {
                    setEmployeeTotal(res.data.Result[0].employee)
                }
            })
            .catch(err => console.error(err));
    }

    const salaryCount = () => {
        axios.get(`${backendUrl}/auth/salary_count`)
            .then(res => {
                if (res.data.Status) {
                    setSalaryTotal(res.data.Result[0].totalSalary)
                }
            })
            .catch(err => console.error(err));
    }
    const handleDelete = (id) =>{
        axios.delete(`${backendUrl}/auth/delete_employee/${id}`)
        .then(result => {
            if(result.data.Status){
                window.location.reload()
            } else{
                alert(result.data.Error)
            }
        })
    }
    return(
        <div className="Home">
        <div className="totals-container">
            <div className="section">
                <h4 className="h4"> Number of Admins </h4>
                <h5 className="h5">Total : {adminTotal}</h5>
            </div>
            <div className="section">
                <h4 className="h4">Number Of Employees of Company</h4>
                <h5 className="h5">Total : {employeeTotal}</h5>
            </div>
            <div className="section">
                <h4 className="h4">Total Of Salaries Summary</h4>
                <h5 className="h5">Total : {salaryTotal}</h5>
            </div>
        </div>
        <div className="admin-list">
            <h3>List of Admins</h3>
            <table className="table-admin">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map(a => (
                        <tr key={a.id}>
                            <td>{a.email}</td>
                            <td>
                                <Link to={`/dashboard/edit_employee/${a.id}`} className="btn-info">Edit</Link>
                                <button className="btn-warning " onClick={() => handleDelete(a.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default Home;