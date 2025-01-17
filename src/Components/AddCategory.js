import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddCategory.css';

const AddCategory = () => {
    const [category, setCategory] = useState("");
    const navigate = useNavigate();
    const backendUrl = process.env.NODE_ENV === "production" 
        ? "https://hatimsysadm-backend.onrender.com"
        : "http://localhost:4000";

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${backendUrl}/auth/add_category`, { category })
            .then(result => {
                if (result.data.Status) {
                    navigate("/dashboard/category");
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="con-addcat">
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-in">
                    <label htmlFor="category" className="form-cont">Category:</label>
                    <input 
                        type="text" 
                        id="category"
                        name="category" 
                        placeholder="Enter category" 
                        className="form-control" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn-add">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;
