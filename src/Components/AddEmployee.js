import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddEmploy.css'
const AddEmployee = () => {
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({
        image:'', // Changed to null initially
        first_name: '',
        last_name:'',
        employee_code :0,
        category_id:0,
        role:'',
        gender:'',
        nid:'',
        contact_number:'',
        date_of_birth:'',
        date_of_joining:'',
        date_of_leaving:'',
        email:'',
        password:'',
        hour_of_work:0,
        rest_days:0,
        salary:0,
        address: '',
        isStillWorking: true, // New state to track employment status
    });
    const [category, setCategory]= useState([])
    const backendUrl = process.env.NODE_ENV === 'production' 
    ? "https://hatimsysadm-backend.onrender.com"
    : "http://localhost:4000";
    useEffect(()=>{
        axios.get(`${backendUrl}/auth/category`)
        .then(result =>{
            console.log(result.data)
            if(result.data.Status){
                setCategory(result.data.Result);
            } else { 
                alert(result.data.Error)
            }
        }).catch(err =>console.log(err))
    }, [])
    const handleSubmit = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", employee.image);
        formData.append("first_name", employee.first_name);
        formData.append("last_name", employee.last_name);
        formData.append("employee_code", employee.employee_code);
        formData.append("category_id", employee.category_id);
        formData.append("role", employee.role);
        formData.append("gender", employee.gender);
        formData.append("nid", employee.nid);
        formData.append("contact_number", employee.contact_number);
        formData.append("date_of_birth", employee.date_of_birth);
        formData.append("date_of_joining", employee.date_of_joining);
        formData.append("date_of_leaving", employee.date_of_leaving);
        formData.append("email", employee.email);
        formData.append("password", employee.password);
        formData.append("hour_of_work", employee.hour_of_work);
        formData.append("rest_days", employee.rest_days);
        formData.append("salary", employee.salary);
        formData.append("address", employee.address);
        axios.post(`${backendUrl}/auth/add_employee`, formData)
        .then(result => {
            console.log(result.data)
            if(result.data.Status){
                navigate('/dashboard/employee')
            }else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
    const handleToggleEmploymentStatus = (e) => {
        const isChecked = e.target.checked;
        setEmployee({
            ...employee,
            isStillWorking: isChecked,
            date_of_leaving: isChecked ? '' : employee.date_of_leaving // Reset date_of_leaving if still working
        });
    };
    return (
        <div className='page'>
			<h2>Add Employee</h2>
			<form className="form-style" onSubmit={handleSubmit}>
                <div className="form-in">
					<label htmlFor="inputGroupFile01" className="form-label" >Select Image</label>
					<input type="file" className="form-image" id="image" name="image"
                    onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
					/>
				</div>
                <div className="form-in">
					<label htmlFor="employee_code" className="form-label">Employee Code</label>
					<input type="text" className="form-control" id="employee_code" placeholder='Enter Employee code' autoComplete='off' onChange={(e) => setEmployee({...employee, employee_code: e.target.value})}
					/>
				</div>
			    <div className="form-in">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="first_name" placeholder='Enter First Name' autoComplete='off' onChange={(e) => setEmployee({...employee, first_name: e.target.value})}
                    />
                </div>
                <div className="form-in">
					<label htmlFor="last_name" className="form-label">Last Name</label>
					<input type="text" className="form-control" id="last_name" placeholder='Enter Last Name' autoComplete='off' onChange={(e) => setEmployee({...employee, last_name: e.target.value})}
					/>
				</div>
                <div className="form-in">
					<label htmlFor="role" className="form-label">Role</label>
					<input type="text" className="form-control" id="role" placeholder='Enter role' autoComplete='off' onChange={(e) => setEmployee({...employee, role: e.target.value})}
					/>
				</div>
                <div className="form-in">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select className="form-select" id="gender" onChange={(e) => setEmployee({...employee, gender: e.target.value})}>
                        <option value="" >Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-in">
					<label htmlFor="nid" className="form-label">NID</label>
					<input type="text" className="form-control" id="nid" placeholder='Enter NID' autoComplete='off' onChange={(e) => setEmployee({...employee, nid: e.target.value})}
					/>
				</div>
				<div className="form-in">
					<label htmlFor="email" className="form-label">Email</label>
					<input type="email" className="form-control" id="email" placeholder='Enter Email' autoComplete='off' onChange={(e) => setEmployee({...employee, email: e.target.value})}
					/>
				</div>
                <div className="form-in">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder='Enter Password' onChange={(e) => setEmployee({...employee, password: e.target.value})}
                    />
                </div>
				<div className="form-in">
					<label htmlFor="salary" className="form-label">Salary</label>
					<input type="text" className="form-control" id="salary" placeholder="Enter Salary" autoComplete='off' onChange={(e) => setEmployee({...employee, salary: e.target.value})}
					/>
				</div>
				<div className="form-in">
					<label htmlFor="address" className="form-label">Address</label>
					<input type="text" 
                    className="form-control" 
                    id="address" 
                    placeholder="1234 Main St" 
                    autoComplete='off' 
                    onChange={(e) => setEmployee({...employee, address: e.target.value})}
					/>
				</div>
                <div className="form-in">
					<label htmlFor="contact_number" className="form-label">Contact Number</label>
					<input type="text" className="form-control" id="contact_number" placeholder='Enter Contact Number' autoComplete='off' onChange={(e) => setEmployee({...employee, contact_number: e.target.value})}
					/>
				</div>
                <div className="form-in">
                    <label htmlFor="date_of_birth" className="form-label">Date Of Birth</label>
                    <input type="date" className="form-control" id="date_of_birth" placeholder='Enter Date of Birth' autoComplete='off' onChange={(e) => setEmployee({...employee, date_of_birth: e.target.value})}
                    />
                </div>
                <div className="form-in">
					<label htmlFor="date_of_joining" className="form-label">Date Of Joining</label>
					<input type="date" className="form-control" id="date_of_joining" autoComplete='off' onChange={(e) => setEmployee({...employee, date_of_joining: e.target.value})}
					/>
				</div>
                
                <div className="form-in">
					<label htmlFor="hour_of_work" className="form-label">Number of Hour of Work</label>
					<input type="number" className="form-control" id="hour_of_work" placeholder='40' autoComplete='off' onChange={(e) => setEmployee({...employee, hour_of_work: e.target.value})}
					/>
				</div>
                <div className="form-in">
					<label htmlFor="rest_days" className="form-label">Number of rest days</label>
					<input type="number" className="form-control" id="rest_days" placeholder='21' autoComplete='off' onChange={(e) => setEmployee({...employee, rest_days: e.target.value})}
					/>
				</div>
                <div className="form-in">
					<label htmlFor="category" className="form-label">Category</label>
					<select name="category" id="category" className="form-select" onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
                        {category && Array.isArray(category) && category.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
				</div>
                <div className="form-in">
                    <label htmlFor="isStillWorking" className="form-label">
                        Is the employee still working?
                    </label>
                    <input
                        type="checkbox"
                        id="isStillWorking"
                        checked={employee.isStillWorking}
                        onChange={handleToggleEmploymentStatus}
                    />
                </div>

                {!employee.isStillWorking && (
                    <div className="form-in">
                        <label htmlFor="date_of_leaving" className="form-label">Date Of Leaving</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date_of_leaving"
                            placeholder="Enter Date of Leaving"
                            autoComplete="off"
                            value={employee.date_of_leaving}
                            onChange={(e) =>
                                setEmployee({ ...employee, date_of_leaving: e.target.value || 'N/A' })
                            }
                        />
                    </div>
                )}

				<div className="form-in">
					<button type="submit" className="but">Create</button>
				</div>
			</form>
		</div>
    )
}
export default AddEmployee;