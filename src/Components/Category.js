import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Category.css'

const Category = () => {
    const [category, setCategory]= useState([])
    const backendUrl = process.env.NODE_ENV === 'production' 
    ? "https://hatimsysadm-backend.onrender.com"
    : "http://localhost:4000";
    useEffect(()=>{
        axios.get(`${backendUrl}/auth/category`)
        .then(result =>{
            if(result.data.Status){
                setCategory(result.data.Result);
            } else { 
                alert(result.data.Error)
            }
        }).catch(err =>console.log(err))
    }, [])
    return (
        <div className="cat-pag ">
            <div className="con">
                <h2>
                    Category List
                </h2>
            </div>
            <Link to="/dashboard/add_category" className="bt">Add category</Link>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name </th>
                        </tr>
                    </thead>
                    <tbody>
                    {category.map(c => (
                            <tr key={c.id}>
                                <td>{c.name}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
export default Category;