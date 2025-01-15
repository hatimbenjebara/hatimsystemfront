import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';
import PrivateRoute from './Components/PrivateRoute';
import { useState } from 'react';
import Footer from '../src/Components/Footer'

function App() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <HashRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetail/>} ></Route>
      <Route path='/dashboard' element={
      <PrivateRoute>
        <Dashboard  setSidebar={setSidebar}/>
      </PrivateRoute>
      }>
        <Route path='' element={<Home />} ></Route>
        <Route path='/dashboard/employee' element={<Employee />} ></Route>
        <Route path='/dashboard/category' element={<Category />} ></Route>
        <Route path='/dashboard/profile' element={<Profile />} ></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />} ></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />} ></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee/>} ></Route>
      </Route>
    </Routes>
    <Footer /> 
    </HashRouter>
  );
}

export default App;
