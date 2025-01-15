import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
//import Validation from "./LoginValidation";
import axios from "axios";
const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email:"",
        password:""
    });
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const backendUrl = process.env.NODE_ENV === 'production' 
    ? "https://hatimsysadm-backend.onrender.com"
    : "http://localhost:4000";
    //define cookies
    axios.defaults.withCredentials = true
    //post a port number is assigned to server , where we want to move to , then to get the result
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${backendUrl}/employee/employee_login`, values)
        .then(result =>{
            if(result.data.loginStatus){
                localStorage.setItem("valid", true);
                navigate('/employee_detail/'+result.data.id);
            } else {
                setError(result.data.Error);
            }
        })
        .catch(err => console.log(err));
    }
    

    return (
        <div className='loginPage'>
            <div className='loginForm'>
                <div>
                    {error && error}
                </div>
                <h2>Employee Page</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input type='email' name='email' autoComplete='off' placeholder='test email: hatim@hatim.com' className='form-control rounded-0' onChange={(e) => setValues({...values, email: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' name='password' placeholder='test password: 1234' className='form-control rounded-0' onChange={(e) => setValues({...values, password: e.target.value})}/>
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>Submit</button>
                </form>
                <div>
                    <input type='checkbox' name='tick' id='tick' />
                    <label >You are agree with terme </label>
                </div>
            </div>
        </div>
    );
}

export default EmployeeLogin;
