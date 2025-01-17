import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Employee.css'

const Employee = () => {
    const [employee, setEmployee]= useState([])
    const [category, setCategory] = useState([]); // State for storing category data
    const navigate = useNavigate()
    const backendUrl = process.env.NODE_ENV === 'production' 
    ? "https://hatimsysadm-backend.onrender.com"
    : "http://localhost:4000";
    useEffect(() =>{
        axios.get(`${backendUrl}/auth/employee`)
        .then(result =>{
            if(result.data.Status){
                setEmployee(result.data.Result);
            } else { 
                alert(result.data.Error)
            }
        }).catch(err =>console.log(err));
        // Fetch categories
        axios.get(`${backendUrl}/auth/category`)
        .then(result => {
            if(result.data.Status){
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error);
            }
        }).catch(err => console.log(err));
    }, [])
    const handleDelete = (id) =>{
        axios.delete(`${backendUrl}/auth/delete_employee/${id}`)
        .then(result => {
            if(result.data.Status){
                window.location.reload();
            } else{
                alert(result.data.Error);
            }
        }).catch(err => console.log(err));
    }
    
    return (
        <div className="page-5">
            <div className="title">
                <h3>
                    Employee List
                </h3>
            </div>
            <div className="button-container">
                <Link to="/dashboard/add_employee" className="btn-success">
                    Add Employee
                </Link>
            </div>
            <div className="table-responsive ">
                <table className="table-em">
                    <thead className="table-dark">
                        <tr>
                            <th>Image</th>
                            <th>First Name </th>
                            <th>Last Name </th>
                            <th>Employee Code </th>
                            <th>Category </th>
                            <th>Role </th>
                            <th>Gender</th>
                            <th>NID</th>
                            <th>Address</th>
                            <th>Contact Number</th>
                            <th>Date of Birth</th>
                            <th>Date of Joining</th>
                            <th>Date of date_of_leaving</th>
                            <th>Email</th>
                            <th>Number of hours of Work</th>
                            <th>Total of Number of rest days taking</th>
                            <th>Salary</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                    {employee.map(e => (
                            <tr key={e.id}>
                                <td> 
                                    <Link to={`/employee_detail/${e.id}`}>
                                        <img src={`${backendUrl}/images/`+e.image} className="employee_image"/>
                                    </Link>
                                </td>
                                <td>{e.first_name}</td>
                                <td>{e.last_name} </td>
                                <td>{e.employee_code}</td>
                                <td>{category.find(cat => cat.id === e.category_id)?.name || 'Unknown Category'}</td>
                                <td>{e.role} </td>
                                <td>{e.gender} </td>
                                <td>{e.nid} </td>
                                <td>{e.address} </td>
                                <td>{e.contact_number} </td>
                                <td>{new Date(e.date_of_birth).toLocaleDateString()}</td>
                                <td>{new Date(e.date_of_joining).toLocaleDateString()}</td>
                                <td>{new Date(e.date_of_leaving).toLocaleDateString()}</td>
                                <td>{e.email} </td>
                                <td>{e.hour_of_work} </td>
                                <td>{e.rest_days} </td>
                                <td>{e.salary}</td>
                                <td>
                                    <Link to={`/dashboard/edit_employee/`+e.id} className="btn-info">Edit</Link>
                                    <button className="btn-warning" onClick={() => handleDelete(e.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
export default Employee;