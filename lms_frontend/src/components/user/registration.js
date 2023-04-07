// import { Link } from "react-router-dom";
import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/apiview/student/";


function Registration() {
    const [StudentData, setStudentData] = useState({
        "full_name": "",
        "email": "",
        "username": "",
        "password": "",
        "intereseted_cat": "",
        "status": "",
    });

    // change element value
    const handleChange = (event) => {
        // console.log(event.target.name, event.target.value)
        setStudentData({
            ...StudentData,
            [event.target.name]:event.target.value
        });
    }
    // end

    // submit form

    const handleForm=(e)=>{
        e.preventDefault();
        const studentFormData = new FormData();
        studentFormData.append("full_name", StudentData.full_name)
        studentFormData.append("email", StudentData.email)
        studentFormData.append("username", StudentData.username)
        studentFormData.append("password", StudentData.password)
        studentFormData.append("intereseted_cat", StudentData.intereseted_cat)

        try{
            axios.post(baseUrl, studentFormData).then((response)=>{
                setStudentData({
                    "full_name": "",
                    "email": "",
                    "password": "",
                    "qualification": "",
                    "intereseted_cat": "",
                    "status": "success",
                });
            });
        }catch(err){
            console.log('error',err)
            setStudentData({'Status': 'error'})
        }
    };
    // End

    const studentLoginStatus = localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus === 'true'){
        window.location.href = '/user-dashboard'
    }

    useEffect(() => {
        document.title = "Student Registrations"

    });

    return(
        <div className="container mt-4">
            <div className="col-6 offset-3">
                {StudentData.status === 'success' && <p className="text-success">Student Registered Successfully</p>}
                {StudentData.status === 'error' && <p className="text-danger">Something is wrong!</p>}
                <div className="card">
                    <h5 className="card-header">User Registration</h5>
                    <div className="card-body">
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Name</label>
                                <input type="text" value={StudentData.full_name} onChange={handleChange} name="full_name" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" value={StudentData.email} onChange={handleChange} name="email" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Username</label>
                                <input type="text" value={StudentData.username} onChange={handleChange} name="username" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" value={StudentData.password} onChange={handleChange} name="password" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Interests</label>
                                <textarea value={StudentData.intereseted_cat} onChange={handleChange} name="intereseted_cat" className="form-control"></textarea>
                                <div id="emailHelp" className="form-text">Ex: Python, Django, JavaScript</div>
                            </div>
                            <button type="submit" onClick={handleForm} className="btn btn-primary">Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration;