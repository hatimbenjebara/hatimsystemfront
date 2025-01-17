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
  const [loginTime, setLoginTime] = useState(null); // Entry time
  const [logoutTime, setLogoutTime] = useState(null); // Exit time
  const [hoursWorked, setHoursWorked] = useState(0);
  const backendUrl =
    process.env.NODE_ENV === 'production'
      ? "https://hatimsysadm-backend.onrender.com"
      : "http://localhost:4000";

  useEffect(() => {
    // Fetch employee details
    axios
      .get(`${backendUrl}/employee/detail/${id}`)
      .then((res) => {
        setEmployee(res.data.result);
        const today = new Date().toDateString(); // Today's date as a string
        axios
          .get(`${backendUrl}/employee/work-log/${id}?date=${today}`)
          .then((logRes) => {
            if (logRes.data.entryTime) {
              setLoginTime(new Date(logRes.data.entryTime));
            }
            if (logRes.data.exitTime) {
              setLogoutTime(new Date(logRes.data.exitTime));
            }
            setHoursWorked(logRes.data.hoursWorked || 0);
          })
          .catch((err) => console.error("Error fetching work log:", err));
      })
      .catch((err) => console.error(err));

    // Fetch categories
    axios
      .get(`${backendUrl}/categories`)
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((err) => console.error(err));
  }, [id, backendUrl]);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const handleLogout = (e) => {
    e.stopPropagation(); // Prevents the event from bubbling up to the parent div
    const logoutTime = new Date();
    if (loginTime) {
      const hoursWorked = Math.abs(logoutTime - loginTime) / 36e5; // Hours difference
      if (hoursWorked < 8) {
        alert("You must work a total of 8 hours before logging out.");
        return;
      }
    }
    
    axios.get(`${backendUrl}/employee/logout`)
    .then((res) => {
      if (res.data.status) { // Matches backend 'status' key
        localStorage.removeItem("valid");
        navigate('/');
      } else {
        alert("Logout failed");
      }
    })
    .catch((err) => {
      console.error("Logout error:", err);
      alert("Logout failed");
    });
  
      }
  
  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h4>
          Hello,{' '}
          {employee.gender === 'Male'
            ? 'Mr.'
            : employee.gender === 'Female'
            ? 'Ms.'
            : 'Mx.'}{' '}
          {employee.first_name} {employee.last_name} Profile
        </h4>
      </div>
      <div>
        <img
          src={`${backendUrl}/images/${employee.image}`}
          alt={employee.name}
          className="employee-image"
        />
        <table className="employee-details-table">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{employee.first_name} {employee.last_name}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{employee.email}</td>
            </tr>
            <tr>
              <td>Role:</td>
              <td>{employee.role}</td>
            </tr>
            <tr>
              <td>Hours Worked Today:</td>
              <td>{hoursWorked} hours</td>
            </tr>
          </tbody>
        </table>
        <div className="employee-category">
          <button className="btn-warning" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default EmployeeDetail;
