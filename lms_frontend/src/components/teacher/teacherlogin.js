import { Link } from "react-router-dom";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";


const baseUrl = "http://127.0.0.1:8000/apiview";

function TeacherLogin() {
    const [teacherLoginData, setteacherLoginData] = useState({
            'email': '',
            'password': '',
    })

    const handleChange = ((event) => {
        setteacherLoginData({
            ...teacherLoginData,
            [event.target.name]:event.target.value
        });
    });

    const submitForm = (event) =>{
        event.preventDefault();
        const teacherFormData = new FormData;
        teacherFormData.append('email', teacherLoginData.email)
        teacherFormData.append('password', teacherLoginData.password)

        try{
            axios.post(baseUrl + '/teacher-login', teacherFormData)
            .then((res) => {
                if(res.data.bool == true){
                    localStorage.setItem('teacherLoginStatus', true);
                    window.location.href = '/teacher-dashboard'
                }
        });
        }catch(error){
            console.log(error);
        }
        
    }

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus == 'true'){
        window.location.href = '/teacher-dashboard'
    }

    useEffect(() => {
        document.title = 'Teacher Login'
    });
    return(
        <div className="container mt-4">
            <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">Teacher Login</h5>
                    <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Username</label>
                            <input type="email" name="email" value={teacherLoginData.email} onChange={handleChange} className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" name="password" value={teacherLoginData.password} onChange={handleChange} className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                        </div>
                        <button onClick={submitForm} type="submit" className="btn btn-primary">Login</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherLogin;