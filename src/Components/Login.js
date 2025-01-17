import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
const Login = () =>{
    const [values, setValues] = useState({
        email:"",
        password:""
    });
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    //define cookies
    axios.defaults.withCredentials = true
    const backendUrl = process.env.NODE_ENV === 'production' 
    ? "https://hatimsysadm-backend.onrender.com"
    : "http://localhost:4000";
    //post a port number is assigned to server , where we want to move to , then to get the result
    const handleSubmit = (event) => {
        event.preventDefault()
         // If you want to use Firebase authentication instead of localhost
        // import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
        // import { auth } from '../firebase/firebase';
        // 
        // signInWithEmailAndPassword(auth, values.email, values.password)
        //     .then((userCredential) => {
        //         // Signed in
        //         localStorage.setItem("valid", true);
        //         navigate('/dashboard');
        //     })
        //     .catch((error) => {
        //         setError(error.message);
        //     });
        axios.post(`${backendUrl}/auth/adminlogin`, values)
        .then(result =>{
            if(result.data.loginStatus){
                localStorage.setItem("valid", true)
                navigate('/dashboard')
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='loginPage'>
            <div className='loginForm'>
                <div>
                    {error && error}
                </div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input type='email' name='email' autoComplete='off' placeholder='test email: admin@admin.com' className='form-control rounded-0' onChange={(e) => setValues({...values, email: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' name='password' placeholder='test password: 1234' className='form-control rounded-0' onChange={(e) => setValues({...values, password: e.target.value})}/>
                    </div>
                    <button className='btn-3'>Submit</button>
                </form>
                <div>
                    <input type='checkbox' name='tick' id='tick' />
                    <label >You are agree with terme </label>
                </div>
            </div>
        </div>
    )
}
export default Login;