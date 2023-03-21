import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import React from 'react';

const baseUrl = "http://127.0.0.1:8000/apiview/teacher/";

function TeacherRegistration() {
    const [teacherData, setteacherData] = useState({
        "full_name": "",
        "email": "",
        "password": "",
        "qualification": "",
        "phone_no": "",
        "skills": "",
        "status": "",
    });

    // change element value
    const handleChange = (event) => {
        // console.log(event.target.name, event.target.value)
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }
    // end

    // submit form

    const handleForm=(e)=>{
        e.preventDefault();
        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("password", teacherData.password)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("phone_no", teacherData.phone_no)
        teacherFormData.append("skills", teacherData.skills)

        try{
            axios.post(baseUrl, teacherFormData).then((res)=>{
                setteacherData({
                    "full_name": "",
                    "email": "",
                    "password": "",
                    "qualification": "",
                    "phone_no": "",
                    "skills": "",
                    "status": "success",
                });
            });
        }catch(err){
            console.log('error',err)
            setteacherData({'Status': 'error'})
        }
    };
    // End

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus === 'true'){
        window.location.href = '/teacher-dashboard'
    }

    useEffect(() => {
        document.title = "Teacher Registrations"

    });

    return(
        <div className="container mt-4">
            <div className="col-6 offset-3">
                {teacherData.status === 'success' && <p className="text-success">Teacher Registered Successfully</p>}
                {teacherData.status === 'error' && <p className="text-danger">Something is wrong!</p>}
                <div className="card">
                    <h5 className="card-header">Teacher Registration</h5>
                    <div className="card-body">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label" htmlFor="full_name">Full Name</label>
                                <input value={teacherData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label" htmlFor="email">Email</label>
                                <input value={teacherData.email} onChange={handleChange} name="email" type="email" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label" htmlFor="password">Password</label>
                                <input value={teacherData.password} onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label" htmlFor="qualification">Qualification</label>
                                <input value={teacherData.qualification} onChange={handleChange} name="qualification" type="text" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label" htmlFor="phone_no">Phone no</label>
                                <input value={teacherData.phone_no} onChange={handleChange} name="phone_no" type="number" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" class="form-label" htmlFor="skills">Skills</label>
                                <textarea value={teacherData.skills} onChange={handleChange} name="skills" className="form-control"></textarea>
                                <div id="emailHelp" className="form-text">Ex: Python, Django, JavaScript</div>
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherRegistration;