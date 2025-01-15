import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddEmploy.css'

const AddCategory = () => {
    const [category, setCategory] = useState()
    const navigate = useNavigate()
    const backendUrl = process.env.NODE_ENV === 'production' 
    ? "https://hatimsysadm-backend.onrender.com"
    : "http://localhost:4000";
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(`${backendUrl}/auth/add_category`, {category})
        .then(result =>{
            if(result.data.Status) {
                navigate('/dashboard/category')
            } else {
                alert(result.data.Error)
            }
            console.log(result.data)
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='con-addcat '>
            <div className='con-addcat-con '>
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-in">
                        <label htmlFor='category' className="form-cont">Category: </label>
                        <input type='text' name='category' placeholder='entre category' className='form-control' onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>Add Category</button>
                </form>
            </div>
        </div>
    )
}
export default AddCategory;