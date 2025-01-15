import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Start.css'

const Start = () =>{
    const navigate = useNavigate()
    const backendUrl = process.env.NODE_ENV === 'production' 
    ? "https://hatimsysadm-backend.onrender.com"
    : "http://localhost:4000";
    useEffect(()=>{
        axios.get(`${backendUrl}/verify`)
        .then(result =>{
        if(result.data.Status){
            if(result.data.role==="admin") {
            navigate('/dashboard')
            } else{
            navigate('/employee_detail/'+ result.data.id)
            }
            }
        }).catch(err => console.log(err))
    }, [])
    return(
        <div className="container">
            <div className="subcontainer">
                <h2 className="subtitle">Login As</h2>
                <div className="btns">
                    <button className="btn-1" onClick={()=> {navigate('/employee_login')} }> Employee</button>
                    <button className="btn-2" onClick={()=> {navigate('/adminlogin')}}> Admin</button>
                </div>
            </div>
        </div>
    )
}
export default Start;